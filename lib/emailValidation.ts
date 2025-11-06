/**
 * Email validation utilities for lead management
 * Validates business emails by rejecting common free email domains
 */

// Common free email domains that should be rejected for B2B leads
const FREE_EMAIL_DOMAINS = new Set([
  // Google
  'gmail.com',
  'googlemail.com',
  
  // Microsoft
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'hotmail.co.uk',
  'outlook.co.uk',
  'live.co.uk',
  
  // Yahoo
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.in',
  'yahoo.co.in',
  'ymail.com',
  'rocketmail.com',
  
  // Apple
  'icloud.com',
  'me.com',
  'mac.com',
  
  // Other popular free providers
  'aol.com',
  'protonmail.com',
  'proton.me',
  'tutanota.com',
  'zoho.com',
  'mail.com',
  'gmx.com',
  'fastmail.com',
  'yandex.com',
  'mail.ru',
  
  // Indian free email providers
  'rediffmail.com',
  'sify.com',
  'in.com',
  'indiatimes.com',
  
  // Temporary/disposable email domains
  '10minutemail.com',
  'tempmail.org',
  'guerrillamail.com',
  'mailinator.com',
  'throwaway.email',
  'temp-mail.org',
  'getnada.com',
  'maildrop.cc',
]);

/**
 * Validates if an email address is a business email
 * @param email - Email address to validate
 * @returns Object with validation result and message
 */
export function validateBusinessEmail(email: string): {
  isValid: boolean;
  isBusiness: boolean;
  message?: string;
} {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      isBusiness: false,
      message: 'Email is required'
    };
  }
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      isBusiness: false,
      message: 'Invalid email format'
    };
  }
  
  // Extract domain from email
  const domain = email.toLowerCase().split('@')[1];
  
  if (!domain) {
    return {
      isValid: false,
      isBusiness: false,
      message: 'Invalid email domain'
    };
  }
  
  // Check if it's a free email domain
  if (FREE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: true,
      isBusiness: false,
      message: 'Business email required. Free email domains (Gmail, Yahoo, Hotmail, etc.) are not accepted for business inquiries.'
    };
  }
  
  // Additional checks for suspicious domains
  if (domain.includes('temp') || domain.includes('disposable') || domain.includes('fake')) {
    return {
      isValid: true,
      isBusiness: false,
      message: 'Temporary or disposable email addresses are not accepted.'
    };
  }
  
  // If it passes all checks, it's considered a business email
  return {
    isValid: true,
    isBusiness: true,
    message: 'Valid business email'
  };
}

/**
 * Validates email for B2C leads (allows all valid emails)
 * @param email - Email address to validate
 * @returns Object with validation result
 */
export function validateConsumerEmail(email: string): {
  isValid: boolean;
  message?: string;
} {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      message: 'Email is required'
    };
  }
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Invalid email format'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid email'
  };
}

/**
 * Get a user-friendly error message for business email validation
 * @param email - Email that failed validation
 * @returns User-friendly error message
 */
export function getBusinessEmailErrorMessage(email: string): string {
  const validation = validateBusinessEmail(email);
  
  if (!validation.isValid) {
    return validation.message || 'Invalid email address';
  }
  
  if (!validation.isBusiness) {
    return validation.message || 'Business email required';
  }
  
  return 'Valid business email';
}

/**
 * Check if a domain is a free email provider
 * @param domain - Domain to check
 * @returns True if it's a free email domain
 */
export function isFreeEmailDomain(domain: string): boolean {
  return FREE_EMAIL_DOMAINS.has(domain.toLowerCase());
}

/**
 * Get list of free email domains (for reference)
 * @returns Array of free email domains
 */
export function getFreeEmailDomains(): string[] {
  return Array.from(FREE_EMAIL_DOMAINS).sort();
}
