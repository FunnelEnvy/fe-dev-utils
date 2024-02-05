const log = (message, method = 'log') => {
	if (
		/fecli|QA_test|debug_mode|FE_LOADER|jump/.test(location.href) ||
		window['FeActivityLoader'].detectTypeOfEnvironment() == 'DEV' ||
		location.href.indexOf('hc9t07003') >= 0 ||
		location.href.indexOf('itg.buy.hpe.com') >= 0
	) {
		// header/content separation
		let argsArray = [...arguments];
		argsArray.shift()
		console?.[method](message, argsArray)
	}
};

export default log;
