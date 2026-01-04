/**
 * Verification Code utilities
 * Generates and validates 5-digit verification codes for meeting verification
 */

/**
 * Generate a random 5-digit code
 * Format: 00000-99999 (always 5 digits, padded with zeros)
 */
export function generateVerificationCode(): string {
  // Generate random number between 0 and 99999
  const code = Math.floor(Math.random() * 100000);
  // Pad with zeros to ensure 5 digits
  return code.toString().padStart(5, '0');
}

/**
 * Validate verification code format
 * Must be exactly 5 digits
 */
export function validateCodeFormat(code: string): boolean {
  return /^\d{5}$/.test(code);
}

/**
 * Check if code is expired
 */
export function isCodeExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Default expiration time: 10 minutes from now
 */
export function getDefaultExpiration(): Date {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);
  return expiresAt;
}

