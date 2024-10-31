/**
 * Log an error to the API.
 * @param {object} error - The full error object
 * @param {string} activity - name of the activity the error originated from
 * @returns {void} No return value
 */
const loggingError = (err, activity = "") => {
  if (err) {
    try {
      fetch("https://8tim12msn8.execute-api.us-east-1.amazonaws.com/prod/logging", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          message: err?.message ?? err ?? "",
          location: window.location.href,
          activity: activity.replace('fe_activity_', ''),
          customer: window?.headerData?.user?.account_id ?? "",
          stack_trace: JSON.stringify(err.stack),
        }),
      });
    } catch (err) {
      // Do nothing
    }
  }
}

export default loggingError;
