const querystring = require('querystring');
const constants = require('../../../constants');
const generateRandomString = require('../../utils/generateRandomString');
// To Add New Playlist
const spotifyLogInRoute = (req, res) => {
  const state = generateRandomString(16);
  const cokiesOptions = { expires: new Date(Date.now() + 5000) };
  if (process.env.DOMAIN !== 'localhost') {
    cokiesOptions.domain = process.env.DOMAIN;
    // cokiesOptions.secure = true;
  }
  res.cookie(constants.SPOTIFY_STATE_KEY, state, cokiesOptions);// 5 secondsz
  let scope = 'user-read-private user-read-email ';
  const { query } = res.req;
  if (query) {
    if (query['folow-playlist']) {
      // example.com?folow-playlist='firstPlaylistId','secontPlaylistId'
      const playlistsToFolow = query['folow-playlist'].split(',');
      res.cookie(constants.PLAYLISTS_TO_FOLOW, playlistsToFolow, cokiesOptions);
      scope += 'playlist-modify-private playlist-modify-public ';
    }
    if (query['folow-artist']) {
      // example.com?folow-artist=artist_id,2nd_artist_id
      const artistToFolow = query['folow-artist'].split(',');
      res.cookie(constants.ARTIST_TO_FOLOW, artistToFolow, cokiesOptions);
      scope += 'user-follow-modify ';
    }
    if (query['folow-song']) {
      // example.com?folow-song=song_id,2nd_song_id
      const songsToFolow = query['folow-song'].split(',');
      res.cookie(constants.SONGS_TO_FOLOW, songsToFolow, cokiesOptions);
      scope += 'user-library-modify ';
    }
    if (query.redirect) {
      const redirectURL = query.redirect;
      res.cookie('redirect', redirectURL, cokiesOptions);
    }
    scope.trim();
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
