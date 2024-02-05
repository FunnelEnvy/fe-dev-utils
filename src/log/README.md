## :gem: log

```js
log(message, method, ...args)
```

This functions allows for logging to be toggled on in developer only environments to allow for debugging without leaving logging statements in production / customer facing settings. Logging will be enabled on DEV and QA environments, as well as URLs containing fecli, QA_test, debug_mode, FE_LOADER.

### :red_circle: Errors:

* Method is intentionally wrapped in a try / catch to prevent errors in the log method from effecting functions calling it.

### :scroll: Usage

```js
log('Example message');
log('Example error', 'error');
log('Example extra options', 'log', 'background: #222; color: #bada55');
```


