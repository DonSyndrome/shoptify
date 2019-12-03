const request = require('request');

// https://developer.spotify.com/console/put-following/
function followArtistsORUsers({ artistsToFolow, type, access_token: accessToken }) {
  const ids = artistsToFolow.join(',');
  console.log(`requesting to add ${type} to library : ${ids}`);
  // "https://api.spotify.com/v1/me/following?type=artist&ids=74ASZWbe4lXaubB36ztrGX%2C08td7MxkoHQkXnWAYD8d6Q
  const options = {
    url: `https://api.spotify.com/v1/me/following?type=${type}&ids=${ids}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true,
    body: {
      public: false,
    },
  };
  request.put(options, (error, response, body) => {
    if (!error && response.statusCode === 204) {
      console.log(`spotify responded to  add ${type} to library without errors: ${ids}`);
    } else {
      console.log(`spotify responded to  add ${type} to library with errors: ${error}`);
    }
  });
}
module.exports = followArtistsORUsers;
