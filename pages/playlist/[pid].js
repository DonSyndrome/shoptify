import React from 'react';

// var admin = require("firebase-admin");
// // Fetch the service account key JSON file contents
// var serviceAccount = require("../../firebase-key.json");


const index =  ({ pid }) => (
  <ul>
  <h1>
    playlist number:{ pid }
  </h1>
  </ul>
)
index.getInitialProps = async ({ query }) => {
  // // Initialize the app with a service account, granting admin privileges
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://spotify-shmerkey.firebaseio.com"
  // });

  // // As an admin, the app has access to read and write all data, regardless of Security Rules
  // var db = await admin.database();
  // var ref = db.ref("playlist");
  // ref.once("value", function(snapshot) {
  //   console.log(snapshot.val());
  // });

  const { pid } = query
    return { pid };
}

  export default index
  