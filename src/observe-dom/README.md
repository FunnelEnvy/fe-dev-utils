

# observeDOM Function Documentation

The `observeDOM` function allows you to observe changes in the DOM using the MutationObserver API. It provides the ability to specify various configuration options and handle errors gracefully. The observer can be disconnected from within the callback if needed.

## Usage

```javascript
observeDOM(targetSelector, callback, config, onError);
```

### Parameters

- `targetSelector` (string): A valid CSS selector for the target element that you want to observe.

- `callback` (function): A callback function that will be called when DOM changes are detected. The function should accept at least one parameter: the `mutation` object containing information about the observed change. Additionally, you can pass a second parameter to the callback that is a function for disconnecting the observer from within the callback.

- `config` (object, optional): An object specifying the configuration options for the MutationObserver. The default configuration includes `childList`, `subtree`, and `attributes` properties set to `true`.

- `onError` (function, optional): A function that handles errors during the setup of the observer. If not provided, errors are logged to the console.

### Callback Parameters

- `mutation` (object): An object containing information about the observed DOM change. This includes properties like `type` (mutation type), `target` (the target element), and more depending on the type of mutation.

- `disconnectObserver` (function): A function that can be called to disconnect the observer from within the callback.

### Example

```javascript
const customConfig = {
  childList: true,
  attributes: false,
};

observeDOM('#targetElement', (mutation, disconnectObserver) => {
  console.log('DOM changed:', mutation);

  // Disconnect the observer from within the callback
  disconnectObserver();
}, customConfig);
```

## Returns

The function returns nothing if an error occurs. If the observer setup is successful, it returns a function that can be used to disconnect the observer.

### Disconnecting the Observer

To disconnect the observer manually, call the function returned by `observeDOM`:

```javascript
const disconnect = observeDOM(/* parameters */);

// To disconnect the observer later:
disconnect();
```

## Error Handling

If the `onError` parameter is provided, it is called when an error occurs during the setup of the observer. If not provided, errors are logged to the console.

## Configuration

The `config` parameter allows you to specify the configuration options for the MutationObserver. The default configuration includes:

- `childList`: Watch for changes to the list of child nodes.
- `subtree`: Watch for changes in the entire subtree of the target.
- `attributes`: Watch for changes to attributes of the target element.



