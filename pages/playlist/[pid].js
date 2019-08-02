import React from 'react';
import PlaylistLP from '../../src/components/PlaylistLP';
//https://images.unsplash.com/photo-1496737018672-b1a6be2e949c

const index = ({ pid, data }) => {
  return (
    <main>
      <PlaylistLP playlist={data} />
    </main>
  )
}
index.getInitialProps = async ({ query, req }) => {
  if (req) {
    var mongoose = await req.mongodb;
    const Playlist = await mongoose.models.Playlist;
    const { pid } = query
    const data = await Playlist.findOne(
      {
        "playlist_slug": pid,
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

    return { pid, data };
  } else {
    return {};
  }
}
export const config = { amp: 'hybrid' };
export default index
