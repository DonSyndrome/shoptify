const request = require('request');
function followPlaylist({ playlistID, access_token: accessToken }) {
  console.log(`requesting to folow playlists from Spotify : ${playlistID}`);
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
      console.log(`spotify responded to folow playlists without errors: ${playlistID}`);
    } else {
      console.log(`spotify responded to folow playlists with errors: ${error}`);
    }
  });
}
module.exports = followPlaylist;
