
# :hammer_and_wrench: How tos

## :gem: waitForConditions

```js
waitForConditions(conditions, callback, timeout = 10000, pollFreq = 100)
```

This function waits for a set of conditions to be true before executing a callback function. It takes an array of conditions to be checked, a callback function to execute once all conditions are true, and an optional timeout and polling frequency.

### :gear: Parameters

* conditions: An array of conditions to be checked. Each condition can be a function that returns a boolean, or a string that represents a CSS selector for an element to be found.
* callback: A callback function to be executed once all conditions are true. The callback function is passed an object that maps CSS selectors to the matching elements.
* timeout: (Optional) The maximum time in milliseconds to wait for all conditions to be true. The default value is 10000ms.
* pollFreq: (Optional) The polling frequency in milliseconds. The default value is 100ms.

### :handshake: Return Value

This function does not return a value, but instead executes the callback function once all conditions are true.

### :red_circle: Errors

This function may throw the following errors:

* TypeError: If the conditions parameter is not an array, or the callback parameter is not a function, or the timeout parameter is not a number greater than or equal to 1000.
* Error: If a condition function throws an error or times out, or if the getElement function throws an error when trying to find an element.

### :scroll: Usage

```js

import { waitForConditions } from 'pageutilities';

// Wait for two elements with class 'my-class' and an element with ID 'my-id'
waitForConditions(['.my-class', '.my-class', '#my-id'], (elements) => {
  console.log(`Found ${elements['.my-class'].length} elements with class 'my-class'`);
  console.log(`Found element with ID 'my-id': ${elements['#my-id'][0].outerHTML}`);
  // Do something with the found elements
}, 10000, 500);
```



# :hammer_and_wrench: How tos

## :gem: waitForConditions

```js
waitForConditions(conditions, callback, onError, timeout = 10000, pollFreq = 100)
```

This function waits for a set of conditions to be true before executing a callback function. It takes an array of conditions to be checked, a callback function to execute once all conditions are true, an optional error callback, and optional timeout and polling frequency.

### :gear: Parameters

* `conditions` (Array): An array of conditions to be checked. Each condition can be a function that returns a boolean or a string representing a CSS selector for an element to be found.
* `callback` (Function): A callback function to be executed once all conditions are true. The callback function receives an object that maps CSS selectors to the matching elements.
* `onError` (Function): An optional error callback function to be executed in case of errors. If not provided, errors will be logged to the console.
* `timeout` (Optional, Number): The maximum time in milliseconds to wait for all conditions to be true. The default value is 10000ms.
* `pollFreq` (Optional, Number): The polling frequency in milliseconds. The default value is 100ms.

### :handshake: Return Value

This function does not return a value but executes the callback function once all conditions are true.

### :red_circle: Errors

This function may throw the following errors:

* `TypeError`: If the `conditions` parameter is not an array, or the `callback` parameter is not a function, or the `timeout` parameter is not a number greater than or equal to 1000.
* `Error`: If a condition function throws an error or times out, or if the `getElement` function (not shown in the provided code) throws an error when trying to find an element.

### :scroll: Usage

```js
import { waitForConditions } from 'pageutilities';

// Wait for two elements with class 'my-class' and an element with ID 'my-id'
waitForConditions(['.my-class', '.my-class', '#my-id'], (elements) => {
  console.log(`Found ${elements['.my-class'].length} elements with class 'my-class'`);
  console.log(`Found element with ID 'my-id': ${elements['#my-id'][0].outerHTML}`);
  // Do something with the found elements
}, (error) => {
  console.error(`An error occurred: ${error}`);
}, 10000, 500);
```


