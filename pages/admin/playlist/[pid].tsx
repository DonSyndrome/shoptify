import React from 'react';
import { MyNextPage } from '../../../next-env';
import AddPlaylistForm from '../../../src/components/Molecules/AddPlaylistForm'

type Props = {
  pid:string | string[]
  data?:any 
}

const index: MyNextPage<Props> = ({ pid, data }) => (
  <AddPlaylistForm 
    playlist={data}
  /> 
);

index.getInitialProps = async (ctx) => {
  const { query, req } = ctx;
  const { pid } = query;
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

  return { pid, data };
};

export default index;
