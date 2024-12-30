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
            return new Promise<void>((resolve, reject) => {
                let intervalId: NodeJS.Timeout;
                let timeoutId: NodeJS.Timeout;

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
        return getElement({ condition, activity: activity ?? undefined, errorHandler: () => null }).catch((error) => {
            throw new Error(error);
        });
    });

    Promise.all(promises)
        .then((fulfilledPromises) => {
            const elements = fulfilledPromises.reduce<Record<string, NodeListOf<Element>>>((acc, curr) => {
                if (curr && typeof curr.selector === 'string') {
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
                onError({ activity: activity ?? undefined, error });
            }
        });
};

export default waitForConditions;
