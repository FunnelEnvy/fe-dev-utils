## :gem: log

```js
log(message, method, ...args)
```

This functions allows for logging to be toggled on in developer only environments to allow for debugging without leaving logging statements in production / customer facing settings.

### :red_circle: Errors:

* Method is intentionally wrapped in a try / catch to prevent errors in the log method from effecting functions calling it.

### :scroll: Usage

```js
log('Example message');
log('Example error', 'error');
log('Example extra options', 'log', 'background: #222; color: #bada55');
```


