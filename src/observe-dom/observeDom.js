const observeDom = (targetSelectorString, callbackFunction, configObject, onError) => {
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
  
 export default observeDom
  
  