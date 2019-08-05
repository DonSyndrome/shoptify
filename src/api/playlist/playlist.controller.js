var Playlist = require('./playlist.dal'),
    playlistYup = require('./playlist.yup');

exports.createPlaylist = function (req, res, next) {
    var Playlist = req.body;
    // validate with formik also
    try {
        playlistYup.validate(Playlist);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    Playlist.create(Playlist, function(err, Playlist) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Playlist created successfully",
            Playlist,
        })
    })
}

exports.getPlaylist = function(req, res, next) {
    Playlist.get({}, function(err, Playlist) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            Playlist: Playlist
        })
    })
}

exports.getPlaylistBySlug = function(req, res, next) {
    Playlist.getBySlug({playlist_slug: req.params.slug}, function(err, Playlist) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            Playlist: Playlist
        })
    })
}

exports.updatePlaylist = function(req, res, next) {
    var Playlist = {
        name: req.body.name,
        description: req.body.description
    }
    Playlist.update({_id: req.params.slug}, Playlist, function(err, Playlist) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Playlist updated successfully"
        })
    })
}

exports.removePlaylist = function(req, res, next) {
    Playlist.delete({_id: req.params.slug}, function(err, Playlist) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Playlist deleted successfully"
        })
    })
}
