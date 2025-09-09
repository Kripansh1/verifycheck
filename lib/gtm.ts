/**
 * Google Tag Manager (GTM) utilities for tracking form submissions and events
 * Provides a clean, scalable way to track different forms and events across the application
 */

// GTM Container ID
export const GTM_ID = 'GTM-NV86HSCC';

// Form types for consistent tracking
export const FORM_TYPES = {
  B2B_HOME: 'b2b_home_form',
  B2C_PROFILE_VERIFICATION: 'b2c_profile_verification_form',
  CONTACT: 'contact_form',
  NEWSLETTER: 'newsletter_form',
} as const;

// Event types for GTM
export const GTM_EVENTS = {
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_SUCCESS: 'form_success',
  FORM_ERROR: 'form_error',
  PAGE_VIEW: 'page_view',
} as const;

// Lead types for categorization
export const LEAD_TYPES = {
  B2B: 'B2B',
  B2C: 'B2C',
} as const;

/**
 * Initialize GTM dataLayer if it doesn't exist
 */
export function initializeGTM(): void {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    console.log('GTM DataLayer initialized:', (window as any).dataLayer);
  }
}

/**
 * Debug function to check GTM status
 */
export function debugGTM(): void {
  if (typeof window !== 'undefined') {
    console.log('=== GTM Debug Info ===');
    console.log('DataLayer exists:', !!(window as any).dataLayer);
    console.log('DataLayer length:', (window as any).dataLayer?.length || 0);
    console.log('GTM loaded:', !!(window as any).google_tag_manager);
    console.log('GTM Container ID:', GTM_ID);

    // Check if GTM script is loaded
    const gtmScript = document.querySelector(`script[src*="${GTM_ID}"]`);
    console.log('GTM script element found:', !!gtmScript);

    if ((window as any).dataLayer) {
      console.log('Recent DataLayer events:', (window as any).dataLayer.slice(-5));
    }
    console.log('======================');
  }
}

/**
 * Push data to GTM dataLayer
 * @param data - Data to push to GTM
 */
export function pushToGTM(data: Record<string, any>): void {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push(data);
    console.log('GTM Event:', data);
  }
}

/**
 * Track form start event
 * @param formType - Type of form being started
 * @param leadType - Type of lead (B2B/B2C)
 * @param additionalData - Additional tracking data
 */
export function trackFormStart(
  formType: string,
  leadType: string,
  additionalData: Record<string, any> = {}
): void {
  pushToGTM({
    event: GTM_EVENTS.FORM_START,
    form_type: formType,
    lead_type: leadType,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
}

/**
 * Track form submission attempt
 * @param formType - Type of form being submitted
 * @param leadType - Type of lead (B2B/B2C)
 * @param formData - Form data being submitted
 * @param additionalData - Additional tracking data
 */
export function trackFormSubmit(
  formType: string,
  leadType: string,
  formData: Record<string, any> = {},
  additionalData: Record<string, any> = {}
): void {
  // Sanitize form data (remove sensitive info)
  const sanitizedData = {
    has_name: !!formData.name,
    has_email: !!formData.email,
    has_phone: !!formData.phone,
    has_company: !!formData.company,
    has_service: !!formData.service,
    email_domain: formData.email ? formData.email.split('@')[1] : undefined,
  };

  pushToGTM({
    event: GTM_EVENTS.FORM_SUBMIT,
    form_type: formType,
    lead_type: leadType,
    form_data: sanitizedData,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
}

/**
 * Track successful form submission
 * @param formType - Type of form that was successful
 * @param leadType - Type of lead (B2B/B2C)
 * @param leadId - ID of the created lead (if available)
 * @param additionalData - Additional tracking data
 */
export function trackFormSuccess(
  formType: string,
  leadType: string,
  leadId?: string,
  additionalData: Record<string, any> = {}
): void {
  pushToGTM({
    event: GTM_EVENTS.FORM_SUCCESS,
    form_type: formType,
    lead_type: leadType,
    lead_id: leadId,
    conversion: true,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
}

/**
 * Track form submission error
 * @param formType - Type of form that failed
 * @param leadType - Type of lead (B2B/B2C)
 * @param error - Error message or type
 * @param additionalData - Additional tracking data
 */
export function trackFormError(
  formType: string,
  leadType: string,
  error: string,
  additionalData: Record<string, any> = {}
): void {
  pushToGTM({
    event: GTM_EVENTS.FORM_ERROR,
    form_type: formType,
    lead_type: leadType,
    error_message: error,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
}

/**
 * Track page view with additional context
 * @param pageName - Name of the page
 * @param pageType - Type of page (B2B/B2C/General)
 * @param additionalData - Additional tracking data
 */
export function trackPageView(
  pageName: string,
  pageType: string,
  additionalData: Record<string, any> = {}
): void {
  pushToGTM({
    event: GTM_EVENTS.PAGE_VIEW,
    page_name: pageName,
    page_type: pageType,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
}

/**
 * Track custom event
 * @param eventName - Name of the custom event
 * @param eventData - Data associated with the event
 */
export function trackCustomEvent(
  eventName: string,
  eventData: Record<string, any> = {}
): void {
  pushToGTM({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventData,
  });
}

/**
 * Enhanced form tracking for B2B leads
 * @param action - Action being tracked (start, submit, success, error)
 * @param formData - Form data (will be sanitized)
 * @param error - Error message if applicable
 */
export function trackB2BForm(
  action: 'start' | 'submit' | 'success' | 'error',
  formData: Record<string, any> = {},
  error?: string
): void {
  const commonData = {
    source: 'home_page',
    page_section: 'hero_form',
  };

  switch (action) {
    case 'start':
      trackFormStart(FORM_TYPES.B2B_HOME, LEAD_TYPES.B2B, commonData);
      break;
    case 'submit':
      trackFormSubmit(FORM_TYPES.B2B_HOME, LEAD_TYPES.B2B, formData, commonData);
      break;
    case 'success':
      trackFormSuccess(FORM_TYPES.B2B_HOME, LEAD_TYPES.B2B, formData.leadId, commonData);
      break;
    case 'error':
      trackFormError(FORM_TYPES.B2B_HOME, LEAD_TYPES.B2B, error || 'Unknown error', commonData);
      break;
  }
}

/**
 * Enhanced form tracking for B2C leads
 * @param action - Action being tracked (start, submit, success, error)
 * @param formData - Form data (will be sanitized)
 * @param error - Error message if applicable
 */
export function trackB2CForm(
  action: 'start' | 'submit' | 'success' | 'error',
  formData: Record<string, any> = {},
  error?: string
): void {
  const commonData = {
    source: 'profile_verification_page',
    page_section: 'hero_form',
  };

  switch (action) {
    case 'start':
      trackFormStart(FORM_TYPES.B2C_PROFILE_VERIFICATION, LEAD_TYPES.B2C, commonData);
      break;
    case 'submit':
      trackFormSubmit(FORM_TYPES.B2C_PROFILE_VERIFICATION, LEAD_TYPES.B2C, formData, commonData);
      break;
    case 'success':
      trackFormSuccess(FORM_TYPES.B2C_PROFILE_VERIFICATION, LEAD_TYPES.B2C, formData.leadId, commonData);
      break;
    case 'error':
      trackFormError(FORM_TYPES.B2C_PROFILE_VERIFICATION, LEAD_TYPES.B2C, error || 'Unknown error', commonData);
      break;
  }
}
