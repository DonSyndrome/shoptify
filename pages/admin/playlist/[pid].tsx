import React from 'react';
import { MyNextPage } from '../../../next-env';
import PlaylistForm from '../../../src/components/Templates/PlaylistForm'

type Props = {
  pid:string | string[]
  data?:any 
}

const index: MyNextPage<Props> = ({ pid, data }) => (
  <PlaylistForm 
    playlist={data}
    edit={true}
  /> 
);

index.getInitialProps = async (ctx) => {
  const { query, req, res } = ctx;
  const { pid } = query;
  if (res){
    const mongoose = await req.mongodb;
    const Playlist = await mongoose.models.Playlist;
    const data = await Playlist.findOne(
      {
        playlist_slug: pid,
      },
      null,
      {},
      (err, docs) => {
        if (err) {
          console.log(err);
          return {};
        }
        return docs;
      },
    );
    if (!data) {
      res.redirect('/admin/playlist');
    } else {
      return { pid, data };
    }
  }
};

export default index;
