
import React from 'react';
import getSiteURL from '../../src/utils/getSiteURL';
import PlaylistsTable from '../../src/components/Templates/PlaylistsTable';
import { Playlist } from '../../src/models/Playlist.model';

type Props = {
  data:Playlist[]
}
const Page = ({data}:Props) => {
  return (
    <PlaylistsTable
      data={data}
    />
  );
}
Page.getInitialProps = async  ({ req, res }) => {
  if (res) {
    const mongoose = await req.mongodb;
    const Playlist = await mongoose.models.Playlist;
    const data = await Playlist.find(
      {
      },
      null,
      {
        sort: { createdAt: -1 },
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return {};
        }
        return data;
      },
    );
    console.log(data);

    return { data };
  } else {
    const url = `${getSiteURL()}/api/playlist`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const data = await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          alert(`problem With Server${JSON.stringify(response)}`);
        }
        return (response);
      })
      .then(response => response.json())
      .then((response) => {
        return {
          data: response.doc,
        }
      });
      return data;
  }
};
export default Page;
