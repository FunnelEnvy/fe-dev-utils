import cookie from '../cookie-manager';
import detectIE from './detectIE';

/**
 * Exit Intent
 * @param {Object} options - Options object to configure the function
 * @param {function} options.callback - Function to call when finished
 * @param {Number} [options.cookieExp] - (Options) Number of days before cookie should expire
 * @param {Number} [options.delay] - (Optional) Timeout delay in seconds
 * @param {Boolean} [options.showOnDelay] - (Optional) Should show after delay
 */
const exitIntent = ({
  callback,
  cookieExp = 0,
  delay = 5,
  showOnDelay = false,
}) => {
  let shown = false;
  const cookieName = 'exitIntent_shown';
  const cookieOverride = 'crometrics-debug';

  const checkCookie = () => {
    if (cookieExp <= 0) {
      cookie.del({ name: cookieName });
      return false;
    }

    if (window.location.search.includes(cookieOverride)) {
      return false;
    }

    if (cookie.get({ name: cookieName }) === 'true') {
      return true;
    }

    return false;
  };

  const triggerIntent = () => {
    if (shown) return;

    shown = true;
    cookie.set({
      name: cookieName,
      value: 'true',
      optDays: cookieExp
    })

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

export default exitIntent;

