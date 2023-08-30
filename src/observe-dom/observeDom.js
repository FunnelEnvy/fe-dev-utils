const observeDOM = (targetSelectorString, callbackFunction, configObject, onError) => {
    const defaultConfig = {
      childList: true,
      subtree: true,
      attributes: true,
    };
  
    const mergedConfig = { ...defaultConfig, ...configObject };
  
    try {
      const target = document.querySelector(targetSelectorString);
      if (!target) {
        throw new Error(`Target element "${targetSelectorString}" not found.`);
      }
  
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          callbackFunction(mutation);
        });
      });
  
      observer.observe(target, mergedConfig);
  
      // Return a function to disconnect the observer
      return () => {
        observer.disconnect();
      };
    } catch (error) {
      const handleOnError = onError || defaultOnError;
      handleOnError(error);
      return null;
    }
  };
  
  // Example usage
  const customConfig = {
    childList: true,
    attributes: false,
  };
  
  // Start observing and get the disconnect function
  const disconnectObserver = observeDOM('#targetElement', (mutation) => {
    console.log('DOM changed:', mutation);
  }, customConfig);
  
  // When the target element is found or when you want to stop observing, call disconnect
  if (disconnectObserver) {
    // Call this function to stop observing
    disconnectObserver();
  }
  