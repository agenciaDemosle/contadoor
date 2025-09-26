const trackEvent = (eventName, eventData = {}) => {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventData
  };
  
  console.log('[Analytics]', event);
  
  // TODO_AURORA: Integrar con Google Analytics o servicio de analytics real
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

export const analytics = {
  quizSubmitted: (score, answers) => {
    trackEvent('quiz_submitted', { score, answers });
  },
  
  formSubmitted: (formType, formData) => {
    trackEvent('form_submitted', { formType, formData });
  },
  
  resourceDownload: (resourceName, resourceId) => {
    trackEvent('resource_download', { resourceName, resourceId });
  },
  
  ctaClick: (ctaName, location) => {
    trackEvent('cta_click', { ctaName, location });
  },
  
  scrollDepth: (percentage) => {
    trackEvent('scroll_depth', { percentage });
  },
  
  checklistComplete: (completedItems) => {
    trackEvent('checklist_complete', { completedItems });
  },
  
  pageView: (pageName) => {
    trackEvent('page_view', { pageName });
  }
};