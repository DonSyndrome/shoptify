"use strict";

let querystring = require('querystring'),
    request = require('request'),
    constants = require('../../constants');

    
function followPlaylist({playlistID,access_token}){
  console.log('requesting A FolowFromSpotify : '+ playlistID)
  var options = {
    url: `https://api.spotify.com/v1/playlists/${playlistID}/followers`,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true,
    body:{
      "public": false
    }
  };
  request.put(options, function(error, response, body) {
    if (!error && response.statusCode === 200){
      console.log('FolowFromSpotify respond without errors: '+ playlistID)
    }else{
      console.log('FolowFromSpotify respond with errors: ' + error)
    }
  })
}

var client_secret = process.env.SPOTIFY_CLIENT_SECRET ; // Your secret


const spotifyCallback = function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[constants.SPOTIFY_STATE_KEY] : null;
  var playlistToFolow = req.cookies ? req.cookies[constants.PLAYLISTS_TO_FOLOW] : null;
  var redirect = req.cookies ? req.cookies['redirect'] : null;


  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(constants.SPOTIFY_STATE_KEY);
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
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        if (playlistToFolow) {
          playlistToFolow.forEach(playlist => {
            followPlaylist({
              playlistID:playlist,
              access_token
            });
          });
        }
        // we can also pass the token to the browser to make requests from there
        res.cookie(constants.SPOTIFY_ACSESS_TOKEN_KEY, access_token);
        if (redirect) {
          res.clearCookie('redirect');
          res.redirect(redirect);
        } else {
          res.redirect('/');
        }
      } else {
        res.redirect(redirect ? redirect : '/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
}

module.exports = spotifyCallback;