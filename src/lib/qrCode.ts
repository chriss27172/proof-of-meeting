import { v4 as uuidv4 } from 'uuid';

export interface QRCodeData {
  fid: number;
  username?: string;
  qrId: string;
  timestamp: number;
}

export function generateQRCodeData(fid: number, username?: string): QRCodeData {
  return {
    fid,
    username,
    qrId: uuidv4(),
    timestamp: Date.now(),
  };
}

export function parseQRCodeData(data: string): QRCodeData | null {
  try {
    const parsed = JSON.parse(data);
    if (parsed.fid && parsed.qrId && parsed.timestamp) {
      return parsed as QRCodeData;
    }
    return null;
  } catch (error) {
    console.error('Error parsing QR code data:', error);
    return null;
  }
}

export function validateQRCode(data: QRCodeData, maxAge: number = 5 * 60 * 1000): boolean {
  // QR code is valid for 5 minutes
  const age = Date.now() - data.timestamp;
  return age < maxAge && age >= 0;
}

