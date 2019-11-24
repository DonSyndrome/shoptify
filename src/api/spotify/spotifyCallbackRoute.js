const querystring = require('querystring');
const request = require('request');
const constants = require('../../../constants');
const getOrCreateUser = require('../user/user.controller').getOrCreateUser();
const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = constants;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret


function followPlaylist({ playlistID, access_token: accessToken }) {
  console.log(`requesting A FolowFromSpotify : ${playlistID}`);
  const options = {
    url: `https://api.spotify.com/v1/playlists/${playlistID}/followers`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true,
    body: {
      public: false,
    },
  };
  request.put(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(`FolowFromSpotify respond without errors: ${playlistID}`);
    } else {
      console.log(`FolowFromSpotify respond with errors: ${error}`);
    }
  });
}

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
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
        console.log('user_object_from_spotify');
        console.log(body);
        await getOrCreateUser(body);

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

  PromisGetToken({ code })
    .then((body) => {
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
            // eslint-disable-next-line camelcase
            access_token: accessToken,
          });
        });
      }
      PromisGetCurentUser({ access_token: accessToken })
        .then((user) => {
          // store the id we get from spotify for the user
          const currentUserId = user.id;
          req.session.spotifyId = currentUserId;
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
