
# :cookie: Cookie Utility

The `cookie` utility provides functions to manipulate browser cookies.

## :hammer_and_wrench: Methods

### :cookie: set

```js
set(name, value, optDays, domain)
```

This method sets a browser cookie with the given parameters.

* `name` (String, required): The name of the cookie.
* `value` (String, required): The value to set for the cookie.
* `optDays` (Number, optional): The number of days the cookie will exist for. If not provided, a "Session Cookie" will be created.
* `domain` (String, optional): The domain value of the cookie. For example, setting it to ".domain.com" would make the cookie valid across all subdomains of "domain.com".

### :cookie: get

```js
get(name)
```

This method retrieves the value of a browser cookie.

* `name` (String, required): The name of the cookie to retrieve.
* Returns: A string value of the cookie, or `null` if the cookie doesn't exist.

### :cookie: del

```js
del(name)
```

This method deletes a browser cookie.

* `name` (String, required): The name of the cookie to delete.

## :scroll: Usage

```js
import cookie from 'pageutilities';

// Set a cookie with a 7-day expiration time
cookie.set('user', 'john_doe', 7);

// Get the value of a cookie
const userName = cookie.get('user');
console.log(`User name: ${userName}`); // This will log "User name: john_doe"

// Delete a cookie
cookie.del('user');
```


