'use strict';

const { URL } = require('url');
const { resolve } = require('path');

module.exports = resolvePath;

/**
 * default options
 *
 * @type {Object}
 * @property {Array|string} methods method to apply
 */
const defaults = {
  methods: 'GET',
};

/**
 * Rewrite middleware to apply resolve path
 *
 * @param {Object} options resolvePath options
 * @returns {Function} resolvePath middleware
 */
function resolvePath(options = {}) {
  const opts = Object.assign({}, defaults, options);

  // 'GET' => ['GET'], 'GET POST' => ['GET', 'POST']
  if (typeof opts.methods === 'string') {
    opts.methods = opts.methods.trim().split(' ');
  }

  // convert to upper case
  const methods = opts.methods.map(val => val.toUpperCase());

  return function resolvePath(req, res, next) {
    if (methods.includes(req.method.toUpperCase())) {
      const origin = `${req.protocol}://${req.hostname}`;

      // by parseurl
      const { pathname, search } = req._parsedUrl;

      const processed = resolve(pathname) + (search || '');

      // WHATWG URL Standard
      const parsed = new URL(processed, origin);

      req._resolveOriginalUrl = req.url;
      req._resolveParsedUrl = parsed;

      // path rewrite
      req.url = parsed.pathname + parsed.search;
    }

    next();
  };
}
