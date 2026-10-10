import { AppointmentData } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

/**
 * Loads an image safely with anonymous crossOrigin to avoid canvas tainting
 */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Draws a rounded rectangle path on 2D canvas context
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Generates an ultra-crisp, professional 1-page visual receipt card
 * as an HTML5 Canvas element.
 */
export async function generateReceiptCanvas(ticket: AppointmentData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const width = 640;
  const height = 560;
  const scale = 2; // High-DPI 2x scale for razor-sharp rendering

  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  ctx.scale(scale, scale);

  // 1. Background Canvas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 2. Outer Border with rounded corners
  roundRect(ctx, 12, 12, width - 24, height - 24, 20);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0d9488';
  ctx.stroke();

  // 3. Header Banner with Healing Teal Gradient (#0D9488 -> #0F766E)
  ctx.save();
  roundRect(ctx, 12, 12, width - 24, 120, 20);
  ctx.clip();

  const headerGradient = ctx.createLinearGradient(12, 12, width - 12, 132);
  headerGradient.addColorStop(0, '#0d9488');
  headerGradient.addColorStop(1, '#0f766e');
  ctx.fillStyle = headerGradient;
  ctx.fillRect(12, 12, width - 24, 120);

  // Decorative top circle
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.arc(width - 50, 30, 80, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 4. Clinic Logo & Header Typography
  const logoImg = await loadImage('/assets/images/logo.png');
  const logoBoxX = 32;
  const logoBoxY = 28;
  const logoBoxSize = 72;

  // White logo tile
  roundRect(ctx, logoBoxX, logoBoxY, logoBoxSize, logoBoxSize, 16);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.stroke();

  if (logoImg) {
    ctx.drawImage(logoImg, logoBoxX + 8, logoBoxY + 8, logoBoxSize - 16, logoBoxSize - 16);
  } else {
    // Fallback medical cross badge
    ctx.fillStyle = '#0d9488';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('+', logoBoxX + logoBoxSize / 2, logoBoxY + logoBoxSize / 2 + 10);
  }

  // Clinic Name & Subtitle
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(CLINIC_INFO.name, 120, 52);

  ctx.fillStyle = '#ccfbf1';
  ctx.font = '500 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('Gentle Healing, Lasting Relief • Vansda, Gujarat', 120, 72);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`${CLINIC_INFO.doctor} (${CLINIC_INFO.qualifications.split('•')[0].trim()})`, 120, 92);

  // 5. Official Token Card (Prominent Center Piece)
  const tokenBoxY = 144;
  roundRect(ctx, 32, tokenBoxY, width - 64, 95, 14);
  ctx.fillStyle = '#f0fdfa';
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#99f6e4';
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f766e';
  ctx.font = 'bold 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('OFFICIAL CONSULTATION TOKEN', width / 2, tokenBoxY + 22);

  ctx.fillStyle = '#0d9488';
  ctx.font = '800 32px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`#${ticket.tokenId}`, width / 2, tokenBoxY + 58);

  ctx.fillStyle = '#10b981';
  roundRect(ctx, width / 2 - 80, tokenBoxY + 68, 160, 20, 10);
  ctx.fillStyle = '#d1fae5';
  ctx.fill();
  ctx.fillStyle = '#065f46';
  ctx.font = 'bold 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('✓ CONFIRMED INQUIRY', width / 2, tokenBoxY + 82);

  // 6. Patient & Consultation Summary Grid
  const detailsBoxY = 252;
  roundRect(ctx, 32, detailsBoxY, width - 64, 205, 12);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#e2e8f0';
  ctx.stroke();

  const rows = [
    { label: 'Patient Name', value: ticket.patientName || 'Valued Patient' },
    { label: 'Mobile Number', value: ticket.patientPhone || 'Not provided' },
    { label: 'Consultation Date', value: `${ticket.appointmentDate} (${ticket.sessionSlot})` },
    { label: 'Specialty / Concern', value: ticket.specialtyConcern || 'General Consultation' },
    { label: 'Inquiry Timestamp', value: ticket.createdAt || new Date().toLocaleDateString('en-IN') },
  ];

  rows.forEach((row, idx) => {
    const rowY = detailsBoxY + idx * 41;
    // Row separator
    if (idx > 0) {
      ctx.beginPath();
      ctx.moveTo(32, rowY);
      ctx.lineTo(width - 32, rowY);
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(row.label, 50, rowY + 26);

    ctx.textAlign = 'right';
    ctx.fillStyle = idx === 0 ? '#0f172a' : '#0f766e';
    ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
    
    // Truncate long value if needed
    let displayVal = row.value;
    if (displayVal.length > 35) {
      displayVal = displayVal.substring(0, 33) + '...';
    }
    ctx.fillText(displayVal, width - 50, rowY + 26);
  });

  // 7. Footer Clinic Details
  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '500 10.5px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('Samrudhi Complex, Opp. Palace Gate, Vansda, Gujarat • Helpline: +91 76002 39816', width / 2, 488);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 9.5px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('Please show this digital receipt at reception or quote the token on WhatsApp.', width / 2, 506);

  ctx.fillStyle = '#0d9488';
  ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('Shri Sai Clinic • Gentle Care & Homeopathic Healing', width / 2, 528);

  return canvas;
}

/**
 * Returns a PNG Blob of the receipt card
 */
export async function generateReceiptBlob(ticket: AppointmentData): Promise<Blob> {
  const canvas = await generateReceiptCanvas(ticket);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create receipt image blob'));
    }, 'image/png');
  });
}

/**
 * Directly downloads the single-page PNG image receipt.
 * Guaranteed 100% single page on all devices (mobile & desktop).
 */
export async function downloadReceiptImage(ticket: AppointmentData): Promise<void> {
  const blob = await generateReceiptBlob(ticket);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeToken = ticket.tokenId.replace(/[/\\?%*:|"<>]/g, '-');
  a.download = `ShriSaiClinic-Receipt-${safeToken}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Opens a strictly 1-page print preview window containing ONLY the receipt image.
 * Cannot overflow into page 2 because of fixed single-page constraints.
 */
export async function printReceiptSinglePage(ticket: AppointmentData): Promise<void> {
  const canvas = await generateReceiptCanvas(ticket);
  const dataUrl = canvas.toDataURL('image/png');
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    // Popup blocked, fallback to downloading image
    await downloadReceiptImage(ticket);
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shri Sai Clinic Receipt #${ticket.tokenId}</title>
        <style>
          @page {
            size: A5 portrait;
            margin: 6mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html, body {
            width: 100%;
            height: 100%;
            overflow: hidden !important;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
          }
          img {
            max-width: 95vw;
            max-height: 94vh;
            object-fit: contain;
            display: block;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            break-inside: avoid !important;
            break-after: avoid !important;
          }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" id="receiptImg" alt="Receipt" />
        <script>
          const img = document.getElementById('receiptImg');
          img.onload = () => {
            setTimeout(() => {
              window.print();
              window.close();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

/**
 * Shares the visual receipt image directly to WhatsApp.
 * - On Mobile (iOS Safari, Android Chrome): Uses Web Share API (navigator.share) with the PNG image file.
 *   The user taps WhatsApp, and WhatsApp opens with the receipt image attached ready to send!
 * - On Desktop: Automatically downloads the receipt image, copies it to clipboard, and opens WhatsApp Web.
 */
export async function shareReceiptImageToWhatsApp(
  ticket: AppointmentData,
  fallbackWhatsAppUrl: string
): Promise<{ success: boolean; method: 'native-share' | 'fallback' | 'aborted'; message?: string }> {
  try {
    const blob = await generateReceiptBlob(ticket);
    const safeToken = ticket.tokenId.replace(/[/\\?%*:|"<>]/g, '-');
    const file = new File([blob], `ShriSaiClinic-Receipt-${safeToken}.png`, { type: 'image/png' });

    // Check if browser supports sharing files natively (Mobile OS share sheet -> WhatsApp)
    if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `Shri Sai Clinic Receipt #${ticket.tokenId}`,
          text: `Shri Sai Clinic Consultation Receipt #${ticket.tokenId} for ${ticket.patientName}`,
        });
        return { success: true, method: 'native-share' };
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return { success: false, method: 'aborted' };
        }
        // If navigator.share fails for any other reason, proceed to fallback below
      }
    }

    // Fallback for desktop or non-sharing browsers:
    // 1. Download the receipt image
    await downloadReceiptImage(ticket);

    // 2. Try copying image to clipboard for quick Ctrl+V into WhatsApp
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
      }
    } catch {
      // Clipboard write optional
    }

    // 3. Open WhatsApp Web / App
    window.open(fallbackWhatsAppUrl, '_blank', 'noopener,noreferrer');

    return {
      success: true,
      method: 'fallback',
      message: 'Receipt image downloaded & copied! Paste (Ctrl+V) directly into WhatsApp.',
    };
  } catch (error: any) {
    console.error('Error sharing receipt image:', error);
    // Ultimate fallback: open standard WhatsApp URL
    window.open(fallbackWhatsAppUrl, '_blank', 'noopener,noreferrer');
    return { success: false, method: 'fallback', message: error.message };
  }
}
