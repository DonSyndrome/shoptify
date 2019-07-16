import React from 'react';
// var Playlist = mongoose.model('Playlist');
import mongoose from 'mongoose';
var Playlist = require('../../models/playlist')(mongoose);


// var admin = require("firebase-admin");
// // Fetch the service account key JSON file contents
// var serviceAccount = require("../../firebase-key.json");


const index =  ({ pid,data }) => (
  <ul>
  <h1>
    playlist number:{ pid }
  </h1>
  <p>
    {JSON.stringify(data)}
  </p>
  </ul>
)
index.getInitialProps = async ({ query }) => {
  const { pid } = query
  const data = await Playlist.findOne(
    {
      "playlist_slug":pid,
    },
    null,
    {},
    (err, docs) => {
      if (err) {
        console.log(err)
        return {};
      } else {
        return docs;
      }
    }
  );

    return { pid,data };
}

  export default index
  