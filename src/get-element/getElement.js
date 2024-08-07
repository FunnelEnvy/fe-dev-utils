/**
 * Get elements matching a CSS selector. Waits for the elements to exist and returns a promise.
 * @param {string} cssSelector - The CSS selector to match elements.
 * @param {number} [outTimer=10000] - (Optional) The maximum time in milliseconds to wait for the elements to exist. Default is 10000ms.
 * @param {function} [onError=null] - (Optional) A callback function to handle errors during the waiting process. If not provided, errors will be logged to the console.
 * @returns {Promise} A promise that resolves with an object containing the selector and matching elements once they are found.
 * @throws {Error} If the timeout is reached and the elements are not found.
 */
const getElement = (cssSelectors, outTimer = 10000, onError = null) => {
  const selectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];
  const results = {};
  let timeoutId;
  let observer;

  return new Promise((resolve, reject) => {
    const checkElements = () => {
      selectors.forEach((selector) => {
        const els = document.querySelectorAll(selector);
        if (els.length > 0) {
          results[selector] = els;
        }
      });

      const unresolvedSelectors = selectors.filter(selector => !results[selector]);

      // If all selectors are resolved, disconnect the observer and resolve the promise
      if (unresolvedSelectors.length === 0) {
        clearTimeout(timeoutId);
        observer.disconnect();
        resolve(results);
      }
    };

    // Initial check in case elements are already available
    checkElements();

    // If some selectors are still unresolved, set up a MutationObserver
    if (Object.keys(results).length < selectors.length) {
      observer = new MutationObserver(checkElements);
      observer.observe(document.body, { childList: true, subtree: true });

      // Set a timeout to reject the promise if selectors aren't found within the given time
      timeoutId = setTimeout(() => {
        observer.disconnect();
        const errorMessage = `Timeout while waiting for selectors: ${selectors.join(', ')}`;
        if (onError && typeof onError === 'function') {
          onError(errorMessage);
        }
        reject(new Error(errorMessage));
      }, outTimer);
    } else {
      // Resolve immediately if all selectors were found during the initial check
      resolve(results);
    }
  });
};

export default getElement;
