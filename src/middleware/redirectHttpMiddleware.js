exports.default = function getRedirectHttpMiddleware(options = {}) {
  const httpsPort = options.httpsPort || 443;
  // eslint-disable-next-line consistent-return
  return function redirectHttpMiddleware(req, res, next) {
    if (req.protocol !== 'https' && process.env.NODE_ENV !== 'development') {
      const parts = req.get('host').split(':');
      const host = parts[0] || '127.0.0.1';
      return res.redirect(`https://${host}:${httpsPort}${req.url}`);
    }
    next();
  };
};
