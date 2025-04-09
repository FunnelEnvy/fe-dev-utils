import getElement from '../get-element';
import onError from '../on-error';

type WaitForConditionsOptions = {
  conditions: (string | (() => boolean))[];
  callback: (elements: Record<string, any>) => void;
  activity?: string | null;
  errorHandler?: ((errorDetails: { activity: string | null; error: Error }) => void) | null;
  timeout?: number;
  pollFreq?: number;
};

/**
 * Poller function that waits for a set of conditions to be true before executing a callback function.
 *
 * @param options - Options object to configure the function.
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
}: WaitForConditionsOptions): void => {
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
        let intervalId: NodeJS.Timeout;
        let timeoutId: NodeJS.Timeout;

        const clearIds = () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };
        intervalId = setInterval(() => {
          try {
            if (condition()) {
              clearIds();
              resolve(true);
            }
          } catch (err) {
            clearIds();
            reject(new Error(`Error executing condition function: ${err}`));
          }
        }, pollFreq);
        timeoutId = setTimeout(() => {
          clearIds();
          reject(new Error(`Condition function timed out: ${condition.toString()}`));
        }, timeout);
      });
    }
    return getElement({ condition, activity: activity ?? undefined, errorHandler: () => null })
  });

  Promise.all(promises)
    .then((results: any) => {
      // Build an object of elements from string conditions.
      // Note: Function conditions resolve to a boolean and aren’t included.
      const elements = conditions.reduce<Record<string, NodeListOf<Element>>>((acc, cond, index) => {
        if (typeof cond === 'string') {
          const result = results[index];
          if (result && typeof result.selector === 'string') {
            acc[result.selector] = result.elements;
          }
        }
        return acc;
      }, {});

      // Now that all promises have resolved, fire the callback.
      callback(elements);
    })
    .catch((error) => {
      if (errorHandler && typeof errorHandler === 'function') {
        errorHandler({ activity, error });
      } else {
        // @ts-ignore
        const currentActivity = window?.FeActivityLoader?.getActivities()
          .find((a: any) => a.activity === (activity ?? ""));
        if (
          currentActivity &&
          currentActivity.enableWaitForConditionsLogging &&
          currentActivity.enableWaitForConditionsLogging === true
        ) {
          onError({ activity: activity ?? undefined, error });
        }
      }
    });
};

export default waitForConditions;
