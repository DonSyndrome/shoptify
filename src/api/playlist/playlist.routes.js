const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/Auth');
const Playlist = require('./playlist.controller');

// add a new playlist
router.post('/', Auth.isAdmin, Playlist.createPlaylist);
// get a list of playlist
router.get('/', Auth.isAuthenticated, Playlist.getPlaylist);
// get a one playlist by the slug
router.get('/:slug', Auth.isAuthenticated, Playlist.getPlaylistBySlug);
// update one playlist by the slug
router.put('/update/:slug', Playlist.updatePlaylist);
// delete one playlist by the slug
router.delete('/remove/:slug', Playlist.removePlaylist);

module.exports = router;
