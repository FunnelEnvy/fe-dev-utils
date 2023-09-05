/**
	 Logs an error to the server
	 @param {string} url - The URL of the server to log the error to
	 @param {string} group - The grouping the error should be sorted under
	 @param {string} activityId - The ID of the activity the error originated from
	 @param {string} page - The page URL the error came from
	 @param {string} message - The error message
	 @param {object} details - The full error details
	 @returns {object} - The response from the server
	 @throws {TypeError} - If the response from the server is not OK
	 */
const logError = async (url, group, activityId, page, message, details) => {
	try {
		if (typeof url !== 'string') {
			throw new TypeError('url must be a string');
		}
		if (typeof group !== 'string') {
			throw new TypeError('group must be a string');
		}
		if (typeof activityId !== 'string') {
			throw new TypeError('activityId must be a string');
		}
		if (typeof page !== 'string') {
			throw new TypeError('page must be a string');
		}
		if (typeof message !== 'string') {
			throw new TypeError('message must be a string');
		}
		const data = await fetch(url, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				group,
				activityId,
				page,
				message,
				details: details ?? null,
			}),
		});
		const json = await data.json();
		return json;
	} catch (error) {
	}
}

export default logError
