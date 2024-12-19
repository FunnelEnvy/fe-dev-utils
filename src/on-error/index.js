/**
 * Function for sending error messages to the backend
 * @param {Object} options - Options object to configure the function.
 * @param {Object} options.error - Error object to log to the backend.
 * @param {string} [options.activity] - Name of the activity that triggered the error.
 */
const onError = ({ activity, error }) => {
  try {
    if (error && window?.FeActivityLoader?.detectTypeOfEnvironment() === "PROD") {
      fetch("https://8tim12msn8.execute-api.us-east-1.amazonaws.com/prod/logging", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          message: error?.message ?? error ?? "",
          location: window.location.href,
          activity,
          customer: window?.headerData?.user?.account_id ?? "",
          stack_trace: JSON.stringify(error?.stack ?? error ?? ""),
        }),
      });
    }
  } catch (e) {}
};

export default onError;
