/**
 * Get elements matching a CSS selector. Waits for the elements to exist using MutationObserver and returns a promise.
 * @param {string|string[]} cssSelectors - The CSS selector or an array of selectors to match elements.
 * @param {number} [timeout=10000] - (Optional) The maximum time in milliseconds to wait for the elements to exist. Default is 10000ms.
 * @param {function} [onError=null] - (Optional) A callback function to handle errors during the waiting process. If not provided, errors will be logged to the console.
 * @returns {Promise} A promise that resolves with an object containing the selector and matching elements once they are found.
 * @throws {Error} If the timeout is reached and the elements are not found.
 */
const checkElements = (cssSelectors, timeout = 10000, onError = null) => {
  const selectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];
  const results = {};

  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(() => {
      selectors.forEach((selector) => {
        const els = document.querySelectorAll(selector);
        if (els.length > 0) {
          results[selector] = els;
          // Remove the selector once elements are found
          selectors.splice(selectors.indexOf(selector), 1);
        }
      });

      // If all selectors have been found, disconnect the observer and resolve the promise
      if (selectors.length === 0) {
        observer.disconnect();
        resolve(results);
      }
    });

    // Check initial state before observing (elements may already be present)
    selectors.forEach((selector) => {
      const els = document.querySelectorAll(selector);
      if (els.length > 0) {
        results[selector] = els;
        selectors.splice(selectors.indexOf(selector), 1);
      }
    });

    if (selectors.length === 0) {
      // If all elements are already present, resolve immediately
      resolve(results);
      return;
    }

    // Start observing the document for DOM changes
    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    // Set a timeout to stop observing and reject if elements aren't found in time
    setTimeout(() => {
      observer.disconnect();
      if (selectors.length > 0) {
        const errorMessage = `Timeout while waiting for selectors: ${selectors.join(', ')}`;
        if (onError && typeof onError === 'function') {
          onError(errorMessage);
        }
        reject(new Error(errorMessage));
      }
    }, timeout);
  });
};

export default checkElements;
