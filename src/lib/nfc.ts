import { v4 as uuidv4 } from 'uuid';

export interface NFCTagData {
  fid: number;
  username?: string;
  tagId: string;
  timestamp: number;
}

export function generateNFCTagData(fid: number, username?: string): NFCTagData {
  return {
    fid,
    username,
    tagId: uuidv4(),
    timestamp: Date.now(),
  };
}

export function parseNFCTagData(data: string): NFCTagData | null {
  try {
    const parsed = JSON.parse(data);
    if (parsed.fid && parsed.tagId && parsed.timestamp) {
      return parsed as NFCTagData;
    }
    return null;
  } catch (error) {
    console.error('Error parsing NFC tag data:', error);
    return null;
  }
}

export function validateNFCTag(data: NFCTagData, maxAge: number = 5 * 60 * 1000): boolean {
  // NFC tag is valid for 5 minutes
  const age = Date.now() - data.timestamp;
  return age < maxAge && age >= 0;
}

// Web NFC API helper functions
export async function writeToNFCTag(data: NFCTagData): Promise<boolean> {
  if (typeof window === 'undefined') {
    console.error('Web NFC API is only available in browser');
    return false;
  }

  if (!('NDEFWriter' in window)) {
    console.error('Web NFC API is not supported in this browser. NFC is only supported on Chrome Android with HTTPS.');
    return false;
  }

  try {
    const writer = new (window as any).NDEFWriter();
    const message = {
      records: [
        {
          recordType: 'text',
          data: JSON.stringify(data),
        },
      ],
    };
    await writer.write(message);
    return true;
  } catch (error: any) {
    console.error('Error writing to NFC tag:', error);
    if (error.name === 'NotAllowedError') {
      console.error('NFC permission denied. Please allow NFC access in browser settings.');
    } else if (error.name === 'NotSupportedError') {
      console.error('NFC is not supported on this device.');
    }
    return false;
  }
}

export async function readFromNFCTag(): Promise<NFCTagData | null> {
  if (typeof window === 'undefined') {
    console.error('Web NFC API is only available in browser');
    return null;
  }

  if (!('NDEFReader' in window)) {
    console.error('Web NFC API is not supported in this browser. NFC is only supported on Chrome Android with HTTPS.');
    return null;
  }

  try {
    const reader = new (window as any).NDEFReader();
    const message = await reader.scan();
    
    if (message.records && message.records.length > 0) {
      const textRecord = message.records.find((r: any) => r.recordType === 'text');
      if (textRecord) {
        const data = JSON.parse(new TextDecoder().decode(textRecord.data));
        return parseNFCTagData(JSON.stringify(data));
      }
    }
    return null;
  } catch (error: any) {
    console.error('Error reading from NFC tag:', error);
    if (error.name === 'NotAllowedError') {
      console.error('NFC permission denied. Please allow NFC access in browser settings.');
    } else if (error.name === 'NotSupportedError') {
      console.error('NFC is not supported on this device.');
    }
    return null;
  }
}

