const log = (message, method = 'log') => {
	try {
		if (
			/fecli|QA_test|debug_mode|FE_LOADER|jump/.test(window.location.href) ||
			window?.['FeActivityLoader']?.detectTypeOfEnvironment() === 'DEV' ||
			window?.['FeActivityLoader']?.detectTypeOfEnvironment() === 'QA'
		) {
			// header/content separation
			let argsArray = [...arguments];
			argsArray.shift()
			console?.[method](message, argsArray)
		}
	} catch (err) {
		// Do nothing
	}
};

export default log;
