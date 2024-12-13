import onError from '../on-error';

/**
 * Executes a callback function when the URL changes in a single page application (SPA).
 * Uses a MutationObserver to observe changes to the document body and detect URL changes.
 * @param {Object} options - Options object to configure the function.
 * @param {function} options.callback - The callback function to execute when the URL changes.
 * @param {string} [options.activity] - (Optional) Name of the activity the function is being called from.
 * @param {function} [options.errorHandler] - (Optional) Function to call when execution encounters an error.
 */
const onUrlChange = ({
  callback,
  activity = null,
  errorHandler = null,
}) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = { childList: true, subtree: true };
  // Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      // Store the current URL in a separate variable to make the code more concise
      const currentUrl = window.location.href;
      // Check if the URL has changed since the last observation
      if (observer.previousUrl !== currentUrl) {
        const oldHref = observer.previousUrl;
        // Update the previous URL and execute the callback function
        observer.previousUrl = currentUrl;
        //console.log('URL changed!');
        observer.disconnect(); // Disconnect the observer to avoid triggering an infinite loop when making DOM changes in the callback function
        try {
          callback(oldHref, mutation);
        } catch (error) {
          console.log(`Error in callback function: ${error}`);
        }
        observer.observe(document.documentElement, mutationConfig); // Reconnect the observer to continue observing URL changes
      }
    });
  });

  // Initialize the previous URL to the current URL

  try {
    observer.previousUrl = window.location.href;
    // Start observing changes to the document documentElement to detect URL changes
    observer.observe(document.documentElement, mutationConfig);
  } catch (error) {
    if (errorHandler && typeof errorHandler === 'function') {
      errorHandler({ activity, error });
    } else {
      onError({ activity, error });
    }
  }
};
export default onUrlChange;
