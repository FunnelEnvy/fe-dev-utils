
# :gem: logError

```js
const logger = new LogError({ apiURL: '<insert url here>' });
errorLogger.error(activityId, page, message, details);
```

This class allos you to configure an error logger and use the attached method to send error messages to our backend.

## :gear: Parameters

* activityId: The id of the activity the error is originating from.
* page: The URL of the page the error came from.
* message: The error message.
* details: (Optional) The full error object.
