'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

interface QRCodeDisplayProps {
  data: string;
  size?: number;
}

export default function QRCodeDisplay({ data, size = 256 }: QRCodeDisplayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="bg-white p-4 rounded-lg"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-400">Loading QR code...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <QRCode value={data} size={size} level="H" />
    </div>
  );
}

