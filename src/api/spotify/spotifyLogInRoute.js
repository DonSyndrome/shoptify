const querystring = require('querystring');
const constants = require('../../../constants');
const generateRandomString = require('../../utils/generateRandomString');
// To Add New Playlist
const spotifyLogInRoute = (req, res) => {
  console.log('makeShure the login-with-spotify route work');
  const state = generateRandomString(16);
  res.cookie(constants.SPOTIFY_STATE_KEY, state);
  let scope = 'user-read-private user-read-email ';
  const { query } = res.req;
  if (query) {
    if (query['folow-playlist']) {
      // parse becose the folow playlist is an array eg:
      // example.com?folow-playlist=['firstPlaylistId','secontPlaylistId']
      const playlistsToFolow = JSON.parse(query['folow-playlist']);
      res.cookie(constants.PLAYLISTS_TO_FOLOW, playlistsToFolow);
      scope += 'playlist-modify-private playlist-modify-public';
    }
    if (query.redirect) {
      const redirectURL = query.redirect;
      res.cookie('redirect', redirectURL);
    }
  }
  // your application requests authorization
  res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
    // eslint-disable-next-line camelcase
    response_type: 'code',
    // eslint-disable-next-line camelcase
    client_id: constants.SPOTIFY_CLIENT_ID,
    // eslint-disable-next-line camelcase
    redirect_uri: constants.SPOTIFY_REDIRECT_URI,
    scope,
    state,
  })}`);
};

module.exports = spotifyLogInRoute;
