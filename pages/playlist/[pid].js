import React from 'react';




const index =  ({ pid,data }) => (
  <ul>
  <h1>
    playlist number:{ pid }
  </h1>
  <p>
    {JSON.stringify(data)}
  </p>
  <a href={'/login-with-spotify?folow-playlist=["2tWQ5raOOYMTs3W6y0W9Y9","4uv9UR7iPeD12LkkV7dXPm"]'}>Log in with Spotify</a>
  </ul>
)
index.getInitialProps = async ({ query,req }) => {
  if (req){
    var mongoose = await req.mongodb;
    const Playlist = await mongoose.models.Playlist;
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
  } else{
    return {};
  }
}

  export default index
  