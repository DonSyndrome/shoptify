"use strict";

let request = require('request'),
  constants = require('../../../constants'),
  client_id = constants.SPOTIFY_CLIENT_ID,
  client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret

const SpotifyRefreshToken = function(req, res) {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.session.refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
      var { access_token,refresh_token } = body;

      req.session.userAccessToken = access_token;
      // req.session.refresh_token = refresh_token;
      // we also pass the token to the browser to make requests from there
      res.cookie(constants.SPOTIFY_ACSESS_TOKEN_KEY, access_token);

      res.send({
        'access_token': access_token
      });
    }
  });
};

module.exports = SpotifyRefreshToken;