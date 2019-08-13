const request = require('request');
const constants = require('../../../constants');
const clientId = constants.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret

const SpotifyRefreshToken = (req, res) => {
  console.log(req.session);
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}` },
    form: {
      // eslint-disable-next-line camelcase
      grant_type: 'refresh_token',
      // eslint-disable-next-line camelcase
      refresh_token: req.session.refreshToken,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(body);
      const { access_token: accessToken } = body;

      req.session.userAccessToken = accessToken;
      // we also pass the token to the browser to make requests from there
      res.cookie(constants.SPOTIFY_ACSESS_TOKEN_KEY, accessToken);
      res.send({
        // eslint-disable-next-line camelcase
        access_token: accessToken,
      });
    }
  });
};

module.exports = SpotifyRefreshToken;
