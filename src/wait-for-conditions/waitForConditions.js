import getElement from '../get-element/getElement';

/**
 * Poller function that waits for a set of conditions to be true before executing a callback function.
 *
 * @param {Array} conditions - An array of conditions to be checked. Each condition can be a function that returns a boolean,
 *                             or a string that represents a CSS selector for an element to be found.
 * @param {function} callback - A callback function to be executed once all conditions are true. The callback function is passed
 *                              an object that maps CSS selectors to the matching elements.
 * @param {number} timeout - (Optional) The maximum time in milliseconds to wait for all conditions to be true. Default is 10000ms.
 *
 * @throws {TypeError} - If the first parameter is not an array, or the second parameter is not a function,
 *                       or the third parameter is not a number greater than or equal to 1000.
 */
const waitForConditions = (conditions, callback, onError, timeout = 10000, pollFreq = 100) => {
  if (!Array.isArray(conditions)) {
    throw new TypeError('The first parameter must be an array');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('The second parameter must be a function');
  }

  if (typeof timeout !== 'number' || timeout < 1000) {
    throw new TypeError('The third parameter must be a number greater than or equal to 1000');
  }

  // Wrap each condition in a promise that resolves when the condition is met
  const promises = conditions.map((condition) => {
    if (typeof condition === 'function') {
      return new Promise((resolve, reject) => {
        let intervalId;
        let timeoutId;

        const clearIds = () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };

        intervalId = setInterval(() => {
          if (condition()) {
            clearIds();
            resolve(true);
          }
        }, pollFreq);

        timeoutId = setTimeout(() => {
          clearIds();
          reject(new Error('Condition timed out'));
        }, timeout);
      });
    } else if (typeof condition === 'string') {
      // Assume it's a selector string and check for the element's presence
      return new Promise((resolve, reject) => {
        let intervalId;
        let timeoutId;

        const clearIds = () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };

        intervalId = setInterval(() => {
          getElement(condition).then((result) => {
            if (result && result.elements.length > 0) {
              clearIds();
              resolve({ selector: condition, elements: result.elements });
            }
          }).catch(reject);
        }, pollFreq);

        timeoutId = setTimeout(() => {
          clearIds();
          reject(new Error(`Element with selector "${condition}" not found within timeout`));
        }, timeout);
      });
    } else {
      return Promise.reject(new TypeError('Conditions must be functions or strings'));
    }
  });

  // Wait for all promises to resolve
  Promise.all(promises)
    .then((fulfilledPromises) => {
      const elements = fulfilledPromises.reduce((acc, curr) => {
        if (curr && typeof curr === 'object' && curr.selector) {
          acc[curr.selector] = curr.elements;
        }
        return acc;
      }, {});

      // Call the callback with all elements found
      callback(elements);
    })
    .catch((error) => {
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    });
};

export default waitForConditions;
