class ErrorLogger {
	constructor(apiURL) {
		this.apiURL = apiURL;
		this.error = this.error.bind(this);
	}

	/**
	 Logs an error to the server
	 @param {string} activityId - The ID of the activity the error originated from
	 @param {string} page - The page URL the error came from
	 @param {string} message - The error message
	 @param {object} details - The full error details
	 @returns {object} - The response from the server
	 @throws {Error} - If the response from the server is not OK
	*/
	static error = async (activityId, page, message, details) => {
		if (typeof activityId !== 'string') {
			throw new Error('activityId must be a string');
		}
		if (typeof page !== 'string') {
			throw new Error('page must be a string');
		}
		if (typeof message !== 'string') {
			throw new Error('message must be a string');
		}
		const data = await fetch(this.apiURL, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				activityId,
				page,
				message,
				details: details ?? null,
			}),
		});
		const json = await data.json();
		return json;
	}
}
