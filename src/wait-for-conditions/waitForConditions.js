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
            resolve();
          }
        }, pollFreq);
        timeoutId = setTimeout(() => {
          clearIds();
          reject();
        }, timeout);
      });
    }
    return getElement(condition).catch((error) => {
      throw new Error(error);
      return null;
    });
  });

  Promise.all(promises)
    .then((fulfilledPromises) => {
      const elements = fulfilledPromises.reduce((acc, curr) => {
        if (curr && curr !== null) {
          acc[curr.selector] = curr.elements;
        }
        return acc;
      }, {});

      if (Object.keys(elements).length > 0) {
        callback(elements);
      }
    })
    .catch((error) => {
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    });
};
export default waitForConditions;
