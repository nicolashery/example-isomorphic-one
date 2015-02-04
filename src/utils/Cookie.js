var env = require('./env');

function Cookie(options) {
  options = options || {};

  this._req = options.req;
  if (env.SERVER && !this._req) {
    throw new Error('Express `req` is a required option');
  }

  this._res = options.res;
  if (env.SERVER && !this._res) {
    throw new Error('Express `res` is a required option');
  }
}

Cookie.prototype.get = function(name) {
  if (env.SERVER) {
    return this._req.cookies[name];
  }
  // Quick and dirty, only supports one value in the cookie
  var parsed = document.cookie.split('=');
  if (parsed.length < 2 || parsed[0] !== name) {
    return null;
  }
  return parsed[1];
};

Cookie.prototype.set = function(name, value) {
  if (env.SERVER) {
    return this._res.cookie(name, value);
  }
  document.cookie = name + '=' + value;
};

Cookie.prototype.clear = function(name) {
  if (env.SERVER) {
    return this._res.clearCookie(name);
  }
  // noop for CLIENT
};

module.exports = Cookie;
