/**
 * @desc set() sets a cookie with optional days
 *  @param {Object} options - Options object to configure the function.
 *  @param {String} options.name - the name of the cookie
 *  @param {String} options.value - the value of the cookie
 *  @param {Number} options.optDays - days the cookie will exist for
 *    NOTE: Not passing optDays will create a "Session Cookie"
 *  @param {String} options.domain - the domain value of the cookie
 *    Example: ".domain.com" would span all sub domains of domain.com
 *  @return {Undefined}

 * @desc get() gets value of cookie
 *  @param {Object} options - Options object to configure the function.
 *  @param {String} options.name - name of cookie to get
 *  @return {String|Null} - string value of cookie NOT A BOOL!
 *
 * @desc del() removes cookie
 *  @param {Object} options - Options object to configure the function.
 *  @param {String} options.name - name of cookie to delete
 *  @return {Undefined}
 */

const cookie = {
  set({ name, value, optDays, domain }) {
    let cookie = name + '=' + value;
    if (optDays) {
      const date = new Date();
      date.setTime(date.getTime() + (optDays * 24 * 60 * 60 * 1000));
      cookie += '; expires=' + date.toGMTString();
    }
    if (domain){
      cookie += '; domain=' + domain;
    }
    document.cookie = cookie + '; path=/';
  },
  get({ name }) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  del({ name }) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
};


export default cookie;
