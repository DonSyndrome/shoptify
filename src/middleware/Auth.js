/* eslint-disable consistent-return */

exports.isAuthenticated = function isAuthenticated(req, res, next) {
  if (!req.session.spotifyId) {
    return res.status(401).send('un0thentik8&unauthenticated');
  }
  next();
};

exports.isAdmin = function isAdmin(req, res, next) {
  if (req.session.admin !== true) {
    return res.status(403).send('cant toch dis');
  }
  next();
};

exports.isSuperAdmin = function isAdmin(req, res, next) {
  if (req.session.superAdmin !== true) {
    return res.status(403).send('cant toch dis');
  }
  next();
};
