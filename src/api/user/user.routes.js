
"use strict";

var Auth = require('../../middleware/Auth'),
    Playlist = require('./Playlist.controller'),
    express = require("express"),
    router = express.Router();
    
// add a new playlist
router.post('/', Auth.isAdmin, Playlist.createPlaylist);
// get a list of playlist 
router.get('/', Auth.isSuperAdmin, Playlist.getPlaylist);
// update one playlist by the slug
router.put('/update/:slug', Playlist.updatePlaylist);
// delete one playlist by the slug
router.delete('/remove/:slug', Playlist.removePlaylist);

module.exports = router;