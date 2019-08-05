
"use strict";

var Playlist = require('./Playlist.controller'),
    express = require("express"),
    router = express.Router();
    
// add a new playlist
router.post('/', Playlist.createPlaylist);
// get a list of playlist 
router.get('/', Playlist.getPlaylist);
// get a one playlist by the slug 
router.get('/:slug', Playlist.getPlaylistBySlug);
// update one playlist by the slug
router.put('/update/:slug', Playlist.updatePlaylist);
// delete one playlist by the slug
router.delete('/remove/:slug', Playlist.removePlaylist);

module.exports = router;