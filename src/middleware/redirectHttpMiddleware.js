// eslint-disable-next-line consistent-return
exports.default = function redirectHttpMiddleware(req, res, next, x) {
  if (req && req.headers && req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http" && process.env.NODE_ENV !== 'development') {
    const parts = req.get('host').split(':');
    const host = parts[0] || '127.0.0.1';
    return res.redirect(`https://${host}${req.url}`);
  }
  next();
};
