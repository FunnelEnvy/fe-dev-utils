/**
 * Get elements matching a CSS selector. Waits for the elements to exist and returns a promise.
 * @param {string} cssSelector - The CSS selector to match elements.
 * @param {number} [outTimer=10000] - (Optional) The maximum time in milliseconds to wait for the elements to exist. Default is 10000ms.
 * @param {function} [onError=null] - (Optional) A callback function to handle errors during the waiting process. If not provided, errors will be logged to the console.
 * @returns {Promise} A promise that resolves with an object containing the selector and matching elements once they are found.
 * @throws {Error} If the timeout is reached and the elements are not found.
 */
const getElement = (cssSelector, outTimer = 10000, onError = null) => {
  let timeoutId;

  const clearTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const els = document.querySelectorAll(cssSelector);
  if (els.length > 0) {
    clearTimer(); // Clear the timeout if elements are found
    return Promise.resolve({
      selector: cssSelector,
      elements: els,
    });
  }

  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const elems = document.querySelectorAll(cssSelector);
        if (elems.length > 0) {
          observer.disconnect();
          clearTimer(); // Clear the timeout if elements are found
          resolve({
            selector: cssSelector,
            elements: elems,
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    timeoutId = setTimeout(() => {
      observer.disconnect();
      const errorMessage = `Timeout while waiting for ${cssSelector}`;
      if (onError && typeof onError === 'function') {
        onError(errorMessage);
      } else {
        console.log(errorMessage);
      }
      console.log(`Timeout while waiting for ${cssSelector}`);
      reject(errorMessage);
    }, outTimer);
  });
};


export default getElement;