import getElement from './get-element';
import waitForConditions from './wait-for-conditions';
import onUrlChange from './on-SPA-url-change';
import logError from './log-error';

export default class FEUtils {
	constructor({ env = 'PROD', api }) {
		this.env = env;
		this.api = api;

		if (this.env !== 'DEV') {
			console.log = () => {};
			console.warn = () => {};
			console.info = () => {};
			console.error = () => {};
		}
	}

	getElement = getElement.bind(this);
	waitForConditions = waitForConditions.bind(this);
	onUrlChange = onUrlChange.bind(this);
	logError = logError.bind(this);
}
