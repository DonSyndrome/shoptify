import React from 'react';

const index =  ({ pid,data }) => {
  return (
    <ul>
    <h1>
      playlist number:{ pid }
    </h1>
    <p>
      {JSON.stringify(data)}
    </p>
    </ul>
  )
}

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

  