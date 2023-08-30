
# :gem: getElement

```js
getElement(cssSelector, outTimer = 10000, onError = null)
```

This function retrieves elements matching a CSS selector. It returns a promise that resolves with an object containing the selector and matching elements once they are found. If the elements are not found within the specified timeout, it rejects the promise.

## :gear: Parameters

* `cssSelector` (required): The CSS selector to match elements.

* `outTimer` (optional, Number): The maximum time in milliseconds to wait for the elements to exist. The default value is 10000ms.

* `onError` (optional, Function): A callback function to handle errors during the waiting process. If not provided, errors will be logged to the console.

## :handshake: Return Value

A promise that resolves with an object containing the selector and matching elements once they are found.

### :red_circle: Errors

* It throws an error if the timeout is reached and the elements are not found.

### :scroll: Usage

```js
import { getElement } from 'pageutilities';

// Get elements with class 'my-class', waiting for a maximum of 5000ms
getElement('.my-class', 5000)
  .then((result) => {
    console.log(`Found ${result.elements.length} elements with class 'my-class'`);
  })
  .catch((error) => {
    console.error(`An error occurred: ${error}`);
  });
```

```js
import { getElement } from 'pageutilities';

// Get elements with class 'my-class', with an error callback
getElement('.my-class', 5000, (error) => {
  console.error(`Error occurred during element retrieval: ${error.message}`);
});
