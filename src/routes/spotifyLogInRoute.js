"use strict";

let querystring = require('querystring'),
    constants = require('../../constants'),
    generateRandomString = require('../utils/generateRandomString');

// To Add New Playlist
const spotifyLogInRoute = function(req, res) {
  console.log('makeShure the login-with-spotify route work');

  var state = generateRandomString(16);
  res.cookie(constants.SPOTIFY_STATE_KEY, state);
  console.log('state ' + state);

  var scope = 'user-read-private user-read-email ';
  const query = res.req.query;
  if (query) {
    if (query['folow-playlist']) {
      const playlistsToFolow = JSON.parse(query['folow-playlist']);
      res.cookie(constants.PLAYLISTS_TO_FOLOW, playlistsToFolow);
      scope += 'playlist-modify-private playlist-modify-public'
    }
    if (query['redirect']) {
      const redirectURL = query['redirect'];
      res.cookie('redirect', redirectURL);
    }
  }
  
  console.log('scope ' + scope);



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