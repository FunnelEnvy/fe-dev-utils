import getElement from '../get-element';
import onError from '../on-error';

/**
 * Poller function that waits for a set of conditions to be true before executing a callback function.
 *
 * @param {Object} options - Options object to configure the function.
 * @param {Array} options.conditions - An array of conditions to be checked. Each condition can be a function that returns a boolean,
 *                                      or a string that represents a CSS selector for an element to be found.
 * @param {function} options.callback - A callback function to be executed once all conditions are true. The callback function is passed
 *                                       an object that maps CSS selectors to the matching elements.
 * @param {string} [options.activity] - (Optional) Name of the activity the function is being called from, if onError is not set this will be used in the
 *                                     default onError function.
 * @param {function} [options.errorHandler] - (Optional) A callback function to be executed if the conditions are not met within the timeout period.
 * @param {number} [options.timeout=10000] - (Optional) The maximum time in milliseconds to wait for all conditions to be true. Default is 10000ms.
 * @param {number} [options.pollFreq=100] - (Optional) The frequency in milliseconds at which to check the conditions. Default is 100ms.
 *
 * @throws {TypeError} - If `conditions` is not an array, `callback` is not a function,
 *                       or `timeout` and `pollFreq` are not numbers greater than or equal to 1000 and 10, respectively.
 */
const waitForConditions = ({
  conditions,
  callback,
  activity = null,
  errorHandler = null,
  timeout = 10000,
  pollFreq = 100,
}) => {
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
    return getElement({ condition, errorHandler: () => null }).catch((error) => {
      throw new Error(error);
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
      if (errorHandler && typeof errorHandler === 'function') {
        errorHandler({ activity, error });
      } else {
        onError({ activity, error });
      }
    });
};
export default waitForConditions;
