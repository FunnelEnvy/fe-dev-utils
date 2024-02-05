const log = (message, method = 'log') => {
	try {
		if (
			/fecli|QA_test|debug_mode|FE_LOADER/.test(window.location.href) ||
			window?.['FeActivityLoader']?.detectTypeOfEnvironment() === 'DEV' ||
			window?.['FeActivityLoader']?.detectTypeOfEnvironment() === 'QA'
		) {
			// header/content separation
			const [_messageArg, _methodArg, ...rest] = arguments;
			if (rest.length > 0) {
				console[method](message, ...rest);
			} else {
				console?.[method](message)
			}
		}
	} catch (err) {
		// Do nothing
	}
};

export default log;
