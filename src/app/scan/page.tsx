'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Html5Qrcode } from 'html5-qrcode';
import { parseQRCodeData, validateQRCode } from '@/lib/qrCode';
import { parseNFCTagData, validateNFCTag } from '@/lib/nfc';

export default function ScanPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<'qr' | 'nfc'>('qr');
  const qrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  const handleScan = (data: string | null) => {
    if (!data) return;

    setScanning(false);
    
    // Stop QR scanner if active
    if (qrCodeRef.current && method === 'qr') {
      qrCodeRef.current.stop().catch(() => {});
    }
    
    let parsedData;
    if (method === 'nfc') {
      parsedData = parseNFCTagData(data);
      if (!parsedData || !validateNFCTag(parsedData)) {
        setError('Invalid or expired NFC tag. Please try again.');
        return;
      }
    } else {
      parsedData = parseQRCodeData(data);
      if (!parsedData || !validateQRCode(parsedData)) {
        setError('Invalid or expired QR code. Please try again.');
        return;
      }
    }

    // Redirect to confirm meeting page
    router.push(`/meeting/confirm?data=${encodeURIComponent(data)}&method=${method}`);
  };

  const handleError = (err: any) => {
    console.error('Scan error:', err);
    setError(`Failed to scan ${method === 'nfc' ? 'NFC tag' : 'QR code'}. Please try again.`);
  };

  const handleNFCRead = async () => {
    if (!('NDEFReader' in window)) {
      setError('NFC is not supported in this browser. Please use QR code instead.');
      return;
    }

    try {
      const reader = new (window as any).NDEFReader();
      const message = await reader.scan();
      
      if (message.records && message.records.length > 0) {
        const textRecord = message.records.find((r: any) => r.recordType === 'text');
        if (textRecord) {
          const data = JSON.parse(new TextDecoder().decode(textRecord.data));
          handleScan(JSON.stringify(data));
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const startQRScanner = async () => {
    if (!scannerContainerRef.current) return;

    try {
      const html5QrCode = new Html5Qrcode('qr-reader');
      qrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' }, // Use back camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleScan(decodedText);
        },
        (errorMessage) => {
          // Ignore scanning errors, they're normal
        }
      );
    } catch (err) {
      console.error('Error starting QR scanner:', err);
      setError('Failed to start camera. Please check permissions.');
      setScanning(false);
    }
  };

  const stopQRScanner = async () => {
    if (qrCodeRef.current) {
      try {
        await qrCodeRef.current.stop();
        await qrCodeRef.current.clear();
      } catch (err) {
        console.error('Error stopping QR scanner:', err);
      }
      qrCodeRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopQRScanner();
    };
  }, []);

  useEffect(() => {
    // Stop scanner when switching methods
    if (!scanning && qrCodeRef.current) {
      stopQRScanner();
    }
  }, [method, scanning]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">📱 Scan QR/NFC</h1>
        
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setMethod('qr')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              method === 'qr'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            QR Code
          </button>
          <button
            onClick={() => setMethod('nfc')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              method === 'nfc'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            NFC Tag
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 mb-6 text-center">
          {scanning && method === 'qr' ? (
            <div>
              <div id="qr-reader" className="w-full max-w-md mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Point your camera at the QR code
              </p>
              <button
                onClick={async () => {
                  await stopQRScanner();
                  setScanning(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Stop Scanner
              </button>
            </div>
          ) : scanning && method === 'nfc' ? (
            <div>
              <div className="text-4xl mb-4">📱</div>
              <p className="text-gray-600 dark:text-gray-400">
                Tap your device to the NFC tag
              </p>
              <button
                onClick={() => {
                  setScanning(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
              >
                Stop NFC Reader
              </button>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">{method === 'nfc' ? '📱' : '📷'}</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {method === 'nfc' 
                  ? 'Click to start NFC reading'
                  : 'Click to start scanning'}
              </p>
              <button
                onClick={async () => {
                  setScanning(true);
                  setError(null);
                  if (method === 'nfc') {
                    handleNFCRead();
                  } else {
                    await startQRScanner();
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Start {method === 'nfc' ? 'NFC Reader' : 'Scanner'}
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          <p>Or enter {method === 'nfc' ? 'NFC tag' : 'QR code'} data manually:</p>
          <input
            type="text"
            placeholder={`Paste ${method === 'nfc' ? 'NFC tag' : 'QR code'} data here`}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            onPaste={(e) => {
              const data = e.clipboardData.getData('text');
              handleScan(data);
            }}
          />
        </div>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

