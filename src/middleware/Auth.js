  exports.isAuthenticated = function (req, res, next) {
    console.log(req.session.spotify_id);
    if (!req.session.spotify_id) {
      console.log('u r not uthenticated!');
      return res.status(401).send('un0thentik8&unauthenticated');
    }
    next()
  }

  exports.isAdmin =  function (req, res, next) {
    if (req.session.admin !== true ) {
      console.log('u r not admin!');
      return res.status(403).send('cant toch dis');
    }
    next()
  }

