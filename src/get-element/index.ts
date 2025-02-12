import onError from '../on-error';

/**
 * Get elements matching a CSS selector. Waits for the elements to exist and returns a promise.
 * @param {Object} options - Options object to configure the function.
 * @param {Array|string} options.condition - The CSS selector to match elements.
 * @param {string} [options.activity] - (Optional) Name of the activity the function is being called from, if onError is not set this will be used in the
 * @param {number} [options.outTimer=10000] - (Optional) The maximum time in milliseconds to wait for the elements to exist. Default is 10000ms.
 * @param {function} [errorHandler=null] - (Optional) A callback function to handle errors during the waiting process. If not provided, errors will be logged to the console.
 * @returns {Promise} A promise that resolves with an object containing the selector and matching elements once they are found.
 * @throws {TypeError} If the timeout is reached and the elements are not found.
 */

type GetElementOptions = {
    condition: string | string[];
    activity?: string;
    errorHandler?: ((params: { activity: string; error: Error }) => void) | null;
    outTimer?: number;
};

const getElement = ({
    condition,
    activity = "",
    errorHandler = null,
    outTimer = 10000,
}: GetElementOptions): Promise<Record<string, NodeListOf<Element>>> => {
    let selectors: string[] = Array.isArray(condition) ? condition : [condition];
    let results: Record<string, NodeListOf<Element>> = {};

    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(() => {
            selectors = selectors.filter((selector) => {
                const els = document.querySelectorAll(selector);
                if (els.length > 0) {
                    results[selector] = els;
                    return false; // Remove from selectors to check
                }
                return true;
            });

            if (selectors.length === 0) {
                observer.disconnect();
                resolve(results);
            }
        });

        // Initial check in case elements are already present
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

        // Observe mutations in the document
        observer.observe(document.body, { childList: true, subtree: true });

        // Set a timeout to reject the promise if elements are not found within the given time
        setTimeout(() => {
            observer.disconnect();
            if (selectors.length > 0) {
                const error = new Error(`Timeout while waiting for selectors: ${selectors.join(', ')}`);
                if (errorHandler && typeof errorHandler === 'function') {
                    errorHandler({ activity, error });
                } else {
                    onError({ activity, error });
                }
                reject(error);
            }
        }, outTimer);
    });
};

export default getElement;
