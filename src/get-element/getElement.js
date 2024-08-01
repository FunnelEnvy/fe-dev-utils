/**
 * Get elements matching a CSS selector. Waits for the elements to exist and returns a promise.
 * @param {string} cssSelector - The CSS selector to match elements.
 * @param {number} [outTimer=10000] - (Optional) The maximum time in milliseconds to wait for the elements to exist. Default is 10000ms.
 * @param {function} [onError=null] - (Optional) A callback function to handle errors during the waiting process. If not provided, errors will be logged to the console.
 * @returns {Promise} A promise that resolves with an object containing the selector and matching elements once they are found.
 * @throws {Error} If the timeout is reached and the elements are not found.
 */
const getElement = (cssSelectors, outTimer = 10000, onError = null) => {
  let selectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];
  let results = {};
  let intervalId;

  const clearTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const checkElements = () => {
    selectors = selectors.filter((selector) => {
      const els = document.querySelectorAll(selector);
      if (els.length > 0) {
        results[selector] = els;
        return false; // Remove from selectors to check
      }
      return true;
    });

    if (selectors.length === 0) {
      clearTimer();
      resolve(results);
    }
  };

  return new Promise((resolve, reject) => {
    selectors.forEach((selector) => {
      const els = document.querySelectorAll(selector);
      if (els.length > 0) {
        results[selector] = els;
        selectors = selectors.filter((s) => s !== selector); // Remove found selector
      }
    });

    if (selectors.length === 0) {
      resolve(results);
      return;
    }

    intervalId = setInterval(checkElements, 100);

    setTimeout(() => {
      clearTimer();
      const errorMessage = `Timeout while waiting for selectors: ${selectors.join(', ')}`;
      if (onError && typeof onError === 'function') {
        onError(errorMessage);
      }
      reject(errorMessage);
    }, outTimer);
  });
};

export default getElement;
