import React from 'react';
import PlaylistLP from '../../src/components/Templates/PlaylistLP';


const index = ({ data }) => {
  return (
    <main>
      <PlaylistLP playlist={data} />
    </main>
  )
}
index.getInitialProps = async ({ query, req }) => {
    const { pid } = query
    var mongoose = await req.mongodb;
    const Playlist = await mongoose.models.Playlist;
    const data = await Playlist.findOne(
      {
        "playlist_slug": pid,
      },
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

}
export const config = { amp: 'hybrid' };
export default index
