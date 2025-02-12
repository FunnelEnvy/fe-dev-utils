import onError from '../on-error';

/**
 * Observer function that checks for a target selector
 * @param {Object} options - Options object to configure the function.
 * @param {String} options.selector - CSS selector to wait for.
 * @param {function} options.callback - A callback function to run when selector is available.
 * @param {Object} [options.config] - (Optional) observer function options to expand or override default config.
 * @param {String} [options.activity] - (Optional) name of activity error occurred in.
 * @param {function} [options.errorHandler] - (Optional) The error handler.
 */

type ObserveDomOptions = {
    selector: string;
    callback: (mutation: MutationRecord) => void;
    config?: MutationObserverInit;
    activity?: string | null;
    errorHandler?: ((params: { activity: string | null; error: Error }) => void) | null;
};

const observeDom = ({
    selector,
    callback,
    config,
    activity = null,
    errorHandler = null,
}: ObserveDomOptions): (() => void) | null => {
    const defaultConfig: MutationObserverInit = {
        childList: true,
        subtree: true,
        attributes: true,
    };

    const mergedConfig = { ...defaultConfig, ...config };

    try {
        const target = document.querySelector(selector);
        if (!target) {
            throw new Error(`Target element "${selector}" not found.`);
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                callback(mutation);
            });
        });

        observer.observe(target, mergedConfig);

        // Return a function to disconnect the observer
        return () => {
            observer.disconnect();
        };
    } catch (err) {
        const handleOnError = errorHandler || onError;
    
        // Ensure the error is of type `Error`
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
    
        handleOnError({ activity: activity || 'Unknown Activity', error });
        return null;
    }
};

export default observeDom;
