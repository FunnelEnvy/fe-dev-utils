


# :gem: onUrlChange

```js
onUrlChange(callback, onError = null)
```

This function allows you to execute a callback function whenever the URL changes in a single-page application (SPA). It utilizes a MutationObserver to observe changes to the document body and detect URL changes.

## :gear: Parameters

* `callback` (required): The callback function to execute when the URL changes. This function should accept two parameters: `oldHref` and `mutation`. `oldHref` is a string containing the URL before it changed, and `mutation` is an object that describes the change that triggered the callback.

* `onError` (optional): An error callback function to be executed in case of errors during the observer setup. If not provided, errors will be logged to the console.

### :red_circle: Errors

* It may throw an error if `callback` is not a function or if any error is caused by the callback itself.

### :scroll: Usage

```js
import { onUrlChange } from 'pageutilities';

// Execute the callback when the URL changes
onUrlChange((oldHref, mutation) => {
  console.log(`URL changed from ${oldHref} to ${window.location.href}`);
  console.log(mutation);
}, (error) => {
  console.error(`An error occurred: ${error}`);
});
```

