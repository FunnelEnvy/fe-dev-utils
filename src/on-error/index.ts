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
        if (
            error &&
            window?.FeActivityLoader?.detectTypeOfEnvironment() === "PROD"
        ) {
            fetch(
                "https://funnelenvy.retool.com/url/error-logging",
                {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({
                        message: error?.message ?? error ?? "",
                        location: window.location.href,
                        activity,
                        customer: window?.headerData?.user?.account_id ?? "",
                        stack_trace: JSON.stringify(error?.stack ?? error ?? ""),
                    }),
                }
            );
        }
    } catch (e) { }
};

export default onError;
