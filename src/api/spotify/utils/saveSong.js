const request = require('request');
function saveSong({ songsToFolow, access_token: accessToken }) {
  const ids = songsToFolow.join(',');
  console.log(`requesting to save playlists from Spotify: ${ids}`);
  const options = {
    url: `https://api.spotify.com/v1/me/tracks?ids=${ids}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true,
    body: {
      public: false,
    },
  };
  request.put(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(`spotify responded to save song respond without errors: ${ids}`);
    } else {
      console.log(`spotify responded to save song respond with errors: ${error}`);
    }
  });
}
module.exports = saveSong;
