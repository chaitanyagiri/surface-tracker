// @ts-nocheck
(function() {
  const iParam = window.analyticsId;

  function getFingerprintData() {
      const userAgent = navigator.userAgent;
      const screenResolution = `${screen.width}x${screen.height}`;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return `${userAgent}-${screenResolution}-${timezone}`;
  }

  function generateUniqueID() {
      const uuid = self.crypto.randomUUID();      
      const fingerprintData = getFingerprintData();
      const combinedData = `${uuid}-${fingerprintData}`;
      const uniqueKey = self.CryptoJS.SHA256(combinedData).toString();
      return uniqueKey;
  }

  function generateVisitorId() {
      let visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
          visitorId = generateUniqueID();
          localStorage.setItem('visitorId', visitorId);
      }
      return visitorId;
  }

  const BACKEND_URL = 'http://localhost:3002/api/events';
  const visitorId = localStorage.getItem('visitorId') || generateVisitorId();

  if (!localStorage.getItem('visitorId')) {
      localStorage.setItem('visitorId', visitorId);
  }

  async function emitEvent(eventType, metadata = {}) {
      try {
          const event = {
              type: eventType || 'unknown',
              visitor: visitorId || 'anonymous',
              url: window.location.href || '',
              metadata: JSON.stringify(metadata) || {},
              createdAt: new Date().toISOString(),
              tag: iParam,
          };
          console.log('emitEvent', event);
          
          const response = await fetch(BACKEND_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(event),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Event emitted successfully:', data);
      } catch (error) {
          console.error('Error emitting event:', error);
      }
  }

  const Analytics = _analytics.init({
      app: 'my-app',
      version: 100,
      plugins: [
          {
            name: 'surface-tracker',
            initialize: ({ config }) => {
              const initFlag = `initialized_${iParam}`;
              if (!localStorage.getItem(initFlag)) {
                  emitEvent('ScriptInitialized');
                  localStorage.setItem(initFlag, 'true');
              }
            },
            page: ({ payload }) => {
                emitEvent('PageView', { url: window.location.href });
            },
            track: ({ payload }) => {
                const { event, properties } = payload;
                emitEvent(event, properties);
            },
            identify: ( {payload} ) => {
                const {traits} = payload;
                emitEvent('Identify', traits);
            }
          }
      ]
  });
  Analytics.page();
  window.Analytics = Analytics;
  document.querySelector('form input[type="submit"]')?.addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT' && event.target.type === 'submit') {
          Analytics.track('FormSubmitted', { formAction: event.target.form.action });
      }
  });
  document.querySelector('form input[type="email"]')?.addEventListener('blur', (event) => {
    if (event.target.tagName === 'INPUT' && event.target.type === 'email') {
        if (email) {
          Analytics.identify('Identify', {email: event.target.value});
        }
    }
  });
})();