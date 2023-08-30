import cookie from '../cookie-manager/cookie'


const detectIE = () => {
  const ua = window.navigator.userAgent;

  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
};


const exitIntent = (options, callback, onError) => {
    let shown = false;
  const cookieName = 'exitIntent_shown';
  const cookieOverride = 'crometrics-debug';
  let delay = 5;
  let showOnDelay = false;
  let cookieExp = 0;

  if (options !== undefined && typeof options === 'object') {
    if (options.cookieExp !== undefined && typeof options.cookieExp === 'number') {
      cookieExp = options.cookieExp;
    }
    if (options.delay !== undefined && typeof options.delay === 'number') {
      delay = options.delay;
    }
    if (options.showOnDelay !== undefined && typeof options.showOnDelay === 'boolean') {
      showOnDelay = options.showOnDelay;
    }
  }

  function useCallback() {
    return typeof callback === 'function' ? callback : () => {};
  }

  function useOnError() {
    return typeof onError === 'function'
      ? onError
      : (error) => {
          console.error(error);
        };
  }
  
  
    const checkCookie = () => {
      if (cookieExp <= 0) {
        cookie.del(cookieName);
        return false;
      }
  
      if (window.location.search.includes(cookieOverride)) {
        return false;
      }
  
      if (cookie.get(cookieName) === 'true') {
        return true;
      }
  
      return false;
    };
  
    const triggerIntent = () => {
      if (shown) return;
  
      shown = true;
      cookie.set(cookieName, 'true', cookieExp)
      
      callback();
    };
  
    const loadEvents = () => {
      const handleMouseOut = (e) => {
        e = e || window.event;
  
        if (e.clientY <= 5 || (detectIE() && e.clientY <= 50)) {
          triggerIntent();
        }
      };
  
      if (showOnDelay) {
        setTimeout(() => {
          triggerIntent();
        }, delay * 1000);
      }
  
      document.addEventListener('mouseout', handleMouseOut, false);
    };


  
    const domReady = (callback) => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    };
  
    domReady(() => {
      if (checkCookie()) {
        return;
      }
  
      loadEvents();
    });
  };
  

  