/**
 * Function for sending error messages to the backend
 * @param {Object} options - Options object to configure the function.
 * @param {Object} options.error - Error object to log to the backend.
 * @param {string} [options.activity] - Name of the activity that triggered the error.
 * 
 * Global Window Extensions:
 * @property {Object} [window.FeActivityLoader] - An object to detect the environment type.
 * @property {function} [window.FeActivityLoader.detectTypeOfEnvironment] - Returns the current environment type (e.g., "PROD").
 * @property {Object} [window.headerData] - Contains user-related metadata.
 */

declare global {
    interface Window {
        FeActivityLoader?: {
            detectTypeOfEnvironment: () => string;
        };
        headerData?: {
            user?: {
                account_id?: string;
            };
        };
    }
}

const onError = ({
    activity,
    error,
}: {
    activity?: string;
    error: any;
}): void => {
    try {
      // DO NOTHING
    } catch (e) {
      // DO NOTHING
    }
};

export default onError;
