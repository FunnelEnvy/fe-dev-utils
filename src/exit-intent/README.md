


# :gem: exitIntent

```js
exitIntent(options, callback, onError)
```

This function enables the implementation of an exit intent behavior on a web page. It triggers a specified callback when a user's mouse cursor moves towards the top of the browser window, indicating an intent to leave the page.

## :gear: Parameters

* `options` (optional, Object): An object containing configuration options for the exit intent behavior.
  * `cookieExp` (optional, Number): The expiration time for the exit intent cookie in seconds. If set to 0 or negative, the cookie will be deleted. Default is 0.
  * `delay` (optional, Number): The delay in seconds before triggering the exit intent behavior. Default is 5 seconds.
  * `showOnDelay` (optional, Boolean): If set to `true`, the exit intent behavior will trigger after the specified delay. If set to `false`, it will trigger immediately on mouse movement. Default is `false`.

* `callback` (required): The callback function to execute when the exit intent behavior is triggered.

* `onError` (optional): An error callback function to handle errors during the execution of the exit intent logic. If not provided, errors will be logged to the console.

## :scroll: Usage

```js
import { exitIntent } from 'pageutilities';

// Example 1: Using the exitIntent function with default options
exitIntent((options) => {
  console.log('Exit intent detected!'); // Replace with your desired callback logic
});

// Example 2: Using the exitIntent function with custom options
exitIntent(
  {
    cookieExp: 3600, // 1 hour
    delay: 3, // 3 seconds delay before triggering
    showOnDelay: true, // Trigger exit intent behavior after the specified delay
  },
  (options) => {
    console.log('Exit intent detected after delay!'); // Replace with your desired callback logic
  },
  (error) => {
    console.error(`An error occurred: ${error}`);
  }
);
```

## :red_circle: Errors

* The function may throw errors in cases of incorrect parameter types or if there are errors during the execution of the exit intent logic. If an `onError` callback is provided, it will be invoked with the error details.

