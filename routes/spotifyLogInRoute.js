"use strict";

let querystring = require('querystring'),
    constants = require('../constants'),
    generateRandomString = require('../utils/generateRandomString');

// To Add New Playlist
const spotifyLogInRoute = function(req, res) {
  console.log('makeShure the login-with-spotify route work')

  var state = generateRandomString(16);
  const playlistsToFolow = JSON.parse(res.req.query['folow-playlist']);

  res.cookie(constants.SPOTIFY_STATE_KEY, state);
  res.cookie(constants.PLAYLISTS_TO_FOLOW, playlistsToFolow);
  var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';


  if (playlistsToFolow) {

  }
  // your application requests authorization
  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: constants.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: constants.SPOTIFY_REDIRECT_URI,
    state: state
  }));
};

module.exports = spotifyLogInRoute;