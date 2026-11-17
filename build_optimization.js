// Build optimization script for TV/Console browsers
(function() {
  'use strict';

  // Detect TV/Console browsers
  function isTVBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('playstation') || 
           userAgent.includes('ps4') || 
           userAgent.includes('ps5') ||
           userAgent.includes('webos') ||
           userAgent.includes('tizen') ||
           userAgent.includes('netcast') ||
           userAgent.includes('roku') ||
           userAgent.includes('smart-tv') ||
           userAgent.includes('opera tv') ||
           userAgent.includes('viera');
  }

  // Apply TV browser optimizations
  if (isTVBrowser()) {
    console.log('TV Browser detected - applying optimizations');
    
    // Reduce animation complexity
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Optimize font rendering
    document.documentElement.style.setProperty('text-rendering', 'optimizeLegibility');
    
    // Disable hover effects (not relevant for TV)
    var style = document.createElement('style');
    style.innerHTML = `
      *:hover {
        transform: none !important;
        transition: none !important;
      }
      
      .tv-optimized {
        font-size: 18px !important;
        padding: 12px !important;
        min-height: 48px !important;
      }
    `;
    document.head.appendChild(style);
    
    // Add TV-specific class for CSS targeting
    document.documentElement.classList.add('tv-browser');
  }

  // Performance monitoring
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        var loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Log performance warnings for slow loads
        if (loadTime > 5000) {
          console.warn('Slow page load detected on TV browser');
        }
      }, 0);
    });
  }

  // Check if Flutter loaded successfully
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Check if Flutter engine is available
      if (typeof window._flutter === 'undefined' && !document.querySelector('flutter-app')) {
        console.warn('Flutter engine not detected - may be loading slowly or failed');
        
        // For TV browsers, try to force load or show helpful message
        if (isTVBrowser()) {
          console.log('TV browser: Flutter may need more time to load');
        }
      }
    }, 3000);
  });

})();
