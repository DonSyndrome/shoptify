import React from 'react';
import { MyNextPage } from '../../next-env';
import PlaylistLP from '../../src/components/Templates/PlaylistLP';

interface indexProps {
  data:any
}

const index:MyNextPage = ({ data }:indexProps) => {
  return (
    <main>
      <PlaylistLP playlist={data} />
    </main>
  )
}
index.getInitialProps = async ({ query, req, res }) => {
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
    if (!data) {
      res.redirect('/404');
    } else {
      return { pid, data };
    }

}

export const config = { amp: 'hybrid' };
export default index
