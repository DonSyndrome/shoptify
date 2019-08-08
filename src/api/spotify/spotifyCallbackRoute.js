"use strict";

let querystring = require('querystring'),
  request = require('request'),
  constants = require('../../../constants'),
  client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret


function followPlaylist({ playlistID, access_token }) {
  console.log('requesting A FolowFromSpotify : ' + playlistID)
  var options = {
    url: `https://api.spotify.com/v1/playlists/${playlistID}/followers`,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true,
    body: {
      "public": false
    }
  };
  request.put(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('FolowFromSpotify respond without errors: ' + playlistID)
    } else {
      console.log('FolowFromSpotify respond with errors: ' + error)
    }
  })
}

function PromisGetCurentUser({ access_token }) {
  return new Promise(function (resolve, reject) {
    console.log('Requesting current user from spotify')
    var options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true,
    };
    // const user = 
    request.get(options, function (error, response, body) {
      if (error) {
        console.log('Requesting current user from spotify respond with errors: ' + error);
        return reject(error);
      }
      try {
        // JSON.parse() can throw an exception if not valid JSON
        resolve(body);
        // return user
      } catch (e) {
        reject(e);
      }
    })
  });
}

function PromisGetToken({ code }) {
  return new Promise(function (resolve, reject) {
    console.log('Requesting Token user from spotify')
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: constants.SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(constants.SPOTIFY_CLIENT_ID + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    // const user = 
    request.post(authOptions, function (error, response, body) {
      if (error) {
        console.log('Requesting Token user from spotify respond with errors: ' + error);
        return reject(error);
      }
      try {
        // JSON.parse() can throw an exception if not valid JSON
        resolve(body);
        // return user
      } catch (e) {
        reject(e);
      }
    })
  });
}




const spotifyCallback = function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[constants.SPOTIFY_STATE_KEY] : null;
  var playlistToFolow = req.cookies ? req.cookies[constants.PLAYLISTS_TO_FOLOW] : null;
  var redirect = req.cookies ? req.cookies['redirect'] : null;
  // check that the state is ok
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  }
  // state is valid, continue 
  res.clearCookie(constants.SPOTIFY_STATE_KEY);

  PromisGetToken({ code }).then(function (body) {
    var { access_token,refresh_token } = body;
    console.log(body);
    // store the tokens we get from spotify fot the user
    req.session.userAccessToken = access_token;
    req.session.refresh_token = refresh_token;
    // we also pass the token to the browser to make requests from there
    res.cookie(constants.SPOTIFY_ACSESS_TOKEN_KEY, access_token);


    if (playlistToFolow) {
      playlistToFolow.forEach(playlist => {
        followPlaylist({
          playlistID: playlist,
          access_token
        });
      });
    }
    PromisGetCurentUser({ access_token })
      .then(function (val) {
        // store the id we get from spotify for the user
        const currentUserId = val.id;
        req.session.spotify_id = currentUserId;
        // then we redirect the loged in user to do what we want
        if (redirect) {
          res.clearCookie('redirect');
          res.redirect(redirect);
        } else {
          res.redirect('/');
        }
      })
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = spotifyCallback;