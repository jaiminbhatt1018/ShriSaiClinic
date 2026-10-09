-- 1. Counter table for daily atomic sequence
CREATE TABLE IF NOT EXISTS public.daily_reference_counters (
    date_key DATE PRIMARY KEY,
    last_count INT NOT NULL DEFAULT 0
);

-- 2. Trigger function to assign DD-MM-YYYY/<sequence> and set completed status
CREATE OR REPLACE FUNCTION public.assign_daily_incremental_reference_id()
RETURNS TRIGGER AS $$
DECLARE
    ist_date DATE;
    ist_date_str TEXT;
    next_seq INT;
BEGIN
    -- Determine current date in Indian Standard Time (Asia/Kolkata)
    ist_date := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
    ist_date_str := TO_CHAR(ist_date, 'DD-MM-YYYY');

    -- Atomically insert or increment counter for today's date
    INSERT INTO public.daily_reference_counters (date_key, last_count)
    VALUES (ist_date, 1)
    ON CONFLICT (date_key)
    DO UPDATE SET last_count = public.daily_reference_counters.last_count + 1
    RETURNING last_count INTO next_seq;

    -- Assign sequential reference ID in format DD-MM-YYYY/<sequence>
    NEW.reference_id := ist_date_str || '/' || next_seq;

    -- Set status to completed enquiry
    NEW.status := 'completed';

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach BEFORE INSERT trigger on patient_inquiries table
DROP TRIGGER IF EXISTS trg_assign_daily_reference_id ON public.patient_inquiries;

CREATE TRIGGER trg_assign_daily_reference_id
BEFORE INSERT ON public.patient_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.assign_daily_incremental_reference_id();
