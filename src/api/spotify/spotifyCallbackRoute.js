const querystring = require('querystring');
const request = require('request');
const constants = require('../../../constants');
const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = constants;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const followPlaylist = require('./utils/followPlayliist');
const followArtistsORUsers = require('./utils/followArtistsORUsers');
const saveSong = require('./utils/saveSong');

function PromisGetCurentUser({ access_token: accessToken }) {
  return new Promise(((resolve, reject) => {
    console.log('Requesting current user from spotify');
    const options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: `Bearer ${accessToken}` },
      json: true,
    };
    // const user =
    request.get(options, (error, response, body) => {
      if (error) {
        console.log(`Requesting current user from spotify respond with errors: ${error}`);
        return reject(error);
      }
      try {
        // JSON.parse() can throw an exception if not valid JSON
        return resolve(body);
        // return user
      } catch (e) {
        return reject(e);
      }
    });
  }));
}

function PromisGetToken({ code }) {
  return new Promise(((resolve, reject) => {
    console.log('Requesting Token user from spotify');
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        // eslint-disable-next-line camelcase
        redirect_uri: SPOTIFY_REDIRECT_URI,
        // eslint-disable-next-line camelcase
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${clientSecret}`).toString('base64')}`,
      },
      json: true,
    };
    request.post(authOptions, (error, response, body) => {
      if (error) {
        console.log(`Requesting Token user from spotify respond with errors: ${error}`);
        return reject(error);
      }
      try {
        // JSON.parse() can throw an exception if not valid JSON
        return resolve(body);
        // return user
      } catch (e) {
        return reject(e);
      }
    });
  }));
}


const spotifyCallback = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[constants.SPOTIFY_STATE_KEY] : null;
  const playlistToFolow = req.cookies ? req.cookies[constants.PLAYLISTS_TO_FOLOW] : null;
  const songsToFolow = req.cookies ? req.cookies[constants.SONGS_TO_FOLOW] : null;
  const artistsToFolow = req.cookies ? req.cookies[constants.ARTIST_TO_FOLOW] : null;
  const redirect = req.cookies ? req.cookies.redirect : null;
  // check that the state is ok
  if (state === null || state !== storedState) {
    res.redirect(`/#${
      querystring.stringify({
        error: 'state_mismatch',
      })}`);
  }
  // state is valid, continue
  res.clearCookie(constants.SPOTIFY_STATE_KEY);

  PromisGetToken({ code }).then((body) => {
    const { access_token: accessToken, refresh_token: refreshToken } = body;
    console.log(body);
    // store the tokens we get from spotify fot the user
    req.session.userAccessToken = accessToken;
    req.session.refreshToken = refreshToken;
    // we also pass the token to the browser to make requests from there
    res.cookie(constants.SPOTIFY_ACSESS_TOKEN_KEY, refreshToken);


    if (playlistToFolow) {
      playlistToFolow.forEach((playlist) => {
        followPlaylist({
          playlistID: playlist,
          access_token: accessToken,
        });
      });
    }
    if (artistsToFolow) {
      followArtistsORUsers({
        artistsToFolow,
        type: 'artist',
        access_token: accessToken,
      });
    }
    // https://open.spotify.com/artist/0rj0bYZWazgyJ3hZTDKQHD?si=ZezYQDyNQZat-R8x85pbQA
    if (songsToFolow) {
      saveSong({
        songsToFolow,
        type: 'artist',
        access_token: accessToken,
      });
    }
    PromisGetCurentUser({ access_token: accessToken })
      .then((val) => {
        // store the id we get from spotify for the user
        const currentUserId = val.id;
        req.session.spotifyId = currentUserId;
        if (currentUserId === '12177313615') {
          req.session.admin = true;
          req.session.superAdmin = true;
        }
        // then we redirect the loged in user to do what we want
        if (redirect) {
          res.clearCookie('redirect');
          res.redirect(redirect);
        } else {
          res.redirect('/');
        }
      });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = spotifyCallback;
