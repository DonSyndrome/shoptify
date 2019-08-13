const Playlist = require('./playlist.dal');
const playlistYup = require('./playlist.yup');

exports.createPlaylist = function createPlaylist(req, res, next) {
  const newPlaylist = req.body;
  // validate with formik also
  playlistYup.validate(newPlaylist)
    .then(ValidNewPlaylist => Playlist.create(ValidNewPlaylist))
    .then((doc) => {
      console.log(doc);
      if (doc.errors) {
        throw Error(doc.errors);
      }
      // still not shure what i think about this rule
      // eslint-disable-next-line no-underscore-dangle
      const document = doc._doc;
      if (document) {
        res.json({
          message: 'Playlist created successfully',
          document,
        });
      }
    }).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.getPlaylist = function getPlaylist(req, res, next) {
  Playlist.get({}, (err, doc) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      doc,
    });
  });
};

exports.getPlaylistBySlug = function getPlaylistBySlug(req, res, next) {
  Playlist.getBySlug(req.params.slug, (err, doc) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      doc,
    });
  });
};

exports.updatePlaylist = function updatePlaylist(req, res, next) {
  const UpdatedPlaylist = req.body;
  playlistYup.validate(UpdatedPlaylist)
    .then(ValidNewPlaylist => Playlist.update(
      { playlist_slug: req.params.slug }, ValidNewPlaylist, (err, doc) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        res.json({
          message: 'Playlist updated successfully',
          doc,
        });
      },
    ))
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

/*
Playlist.update({ playlist_slug: req.params.slug }, UpdatedPlaylist, (err, Success) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Playlist updated successfully',
      Success,
    });
  });
*/

exports.removePlaylist = function removePlaylist(req, res, next) {
  Playlist.delete({ playlist_slug: req.params.slug }, (err, doc) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Playlist deleted successfully',
      doc,
    });
  });
};
