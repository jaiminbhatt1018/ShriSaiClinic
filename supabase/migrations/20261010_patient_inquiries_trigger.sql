-- 1. Enable pg_net extension
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Create patient_inquiries table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.patient_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    appointment_date TEXT,
    appointment_time TEXT,
    doctor_or_service TEXT,
    symptoms_notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.patient_inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Policies for public inquiry submissions
DROP POLICY IF EXISTS "Enable insert for all users" ON public.patient_inquiries;
CREATE POLICY "Enable insert for all users" ON public.patient_inquiries
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable read for all users" ON public.patient_inquiries;
CREATE POLICY "Enable read for all users" ON public.patient_inquiries
    FOR SELECT USING (true);

-- 5. Trigger function calling send-appointment-email Edge Function via pg_net
CREATE OR REPLACE FUNCTION public.handle_new_patient_inquiry()
RETURNS TRIGGER AS $$
DECLARE
    request_id BIGINT;
    payload JSONB;
BEGIN
    payload := jsonb_build_object(
        'name', NEW.name,
        'phone', NEW.phone,
        'email', COALESCE(NEW.email, ''),
        'appointment_date', COALESCE(NEW.appointment_date, ''),
        'appointment_time', COALESCE(NEW.appointment_time, ''),
        'doctor_or_service', COALESCE(NEW.doctor_or_service, 'General Consultation'),
        'symptoms_notes', COALESCE(NEW.symptoms_notes, ''),
        'reference_id', COALESCE(NEW.reference_id, 'SSC-' || UPPER(SUBSTRING(MD5(RANDOM()::text) FROM 1 FOR 6)))
    );

    SELECT net.http_post(
        url := 'https://alehmbxzlsqiryhizrtp.supabase.co/functions/v1/send-appointment-email',
        body := payload,
        headers := '{"Content-Type": "application/json"}'::jsonb,
        timeout_milliseconds := 10000
    ) INTO request_id;

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Failed to trigger send-appointment-email via pg_net: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Trigger on patient_inquiries table
DROP TRIGGER IF EXISTS on_patient_inquiry_created ON public.patient_inquiries;

CREATE TRIGGER on_patient_inquiry_created
AFTER INSERT ON public.patient_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_patient_inquiry();
