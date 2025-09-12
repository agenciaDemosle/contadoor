// Google Tag Manager utilities for SPA tracking

// Initialize dataLayer if it doesn't exist
window.dataLayer = window.dataLayer || [];

/**
 * Push event to GTM dataLayer
 */
export const gtmPush = (eventData) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
    console.log('GTM Event:', eventData); // Para debugging
  }
};

/**
 * Track page views in SPA
 */
export const trackPageView = (pageName, pageUrl = window.location.pathname) => {
  gtmPush({
    event: 'page_view',
    page_title: pageName,
    page_location: window.location.href,
    page_path: pageUrl
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName, section, additionalData = {}) => {
  gtmPush({
    event: 'button_click',
    button_name: buttonName,
    section: section,
    ...additionalData
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName, formType = 'contact', additionalData = {}) => {
  gtmPush({
    event: 'form_submit',
    form_name: formName,
    form_type: formType,
    ...additionalData
  });
};

/**
 * Track form starts (when user interacts with first field)
 */
export const trackFormStart = (formName, formType = 'contact') => {
  gtmPush({
    event: 'form_start',
    form_name: formName,
    form_type: formType
  });
};

/**
 * Track quote calculator events
 */
export const trackQuoteEvent = (action, step = null, data = {}) => {
  gtmPush({
    event: 'quote_calculator',
    quote_action: action, // 'start', 'step_complete', 'abandon', 'complete'
    quote_step: step,
    ...data
  });
};

/**
 * Track engagement events
 */
export const trackEngagement = (engagementType, details = {}) => {
  gtmPush({
    event: 'engagement',
    engagement_type: engagementType, // 'scroll', 'time_on_page', 'video_play', etc.
    ...details
  });
};

/**
 * Track conversions
 */
export const trackConversion = (conversionType, value = null, additionalData = {}) => {
  gtmPush({
    event: 'conversion',
    conversion_type: conversionType, // 'quote_request', 'contact_form', 'phone_call'
    conversion_value: value,
    ...additionalData
  });
};

/**
 * Track CTA clicks with enhanced data
 */
export const trackCTAClick = (ctaText, ctaPosition, pageSection, destinationPage = null) => {
  gtmPush({
    event: 'cta_click',
    cta_text: ctaText,
    cta_position: ctaPosition, // 'header', 'hero', 'footer', etc.
    page_section: pageSection,
    destination_page: destinationPage
  });
};

/**
 * Track file downloads
 */
export const trackFileDownload = (fileName, fileType, section) => {
  gtmPush({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType,
    download_section: section
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (linkUrl, linkText, section) => {
  gtmPush({
    event: 'external_link_click',
    link_url: linkUrl,
    link_text: linkText,
    link_section: section
  });
};