const Playlist = require('./playlist.dal');
const playlistYup = require('./playlist.yup').default;

exports.createPlaylist = function createPlaylist(req, res, next) {
  const newPlaylist = req.body;
  // validate with formik also
  try {
    playlistYup.validate(newPlaylist);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
  Playlist.create(newPlaylist, (err, Success) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Playlist created successfully',
      Success,
    });
  });
};

exports.getPlaylist = function getPlaylist(req, res, next) {
  Playlist.get({}, (err, Success) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      Success,
    });
  });
};

exports.getPlaylistBySlug = function getPlaylistBySlug(req, res, next) {
  Playlist.getBySlug(req.params.slug, (err, Success) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      Success,
    });
  });
};

exports.updatePlaylist = function updatePlaylist(req, res, next) {
  const UpdatedPlaylist = req.body;
  Playlist.update({ _id: req.params.slug }, UpdatedPlaylist, (err, Success) => {
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
};

exports.removePlaylist = function removePlaylist(req, res, next) {
  Playlist.delete({ _id: req.params.slug }, (err, Success) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Playlist deleted successfully',
      Success,
    });
  });
};
