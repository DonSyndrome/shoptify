import React from 'react';
import { MyNextPage } from '../next-env';
import getSiteURL from '../src/utils/getSiteURL';
import { Playlist } from "../src/models/Playlist.model";
import CardGrid from '../src/components/Organisms/CardGrid';

interface Props {
  playlists:Playlist[]

}

const Home: MyNextPage = ({playlists}:Props) => {
  return (
    <CardGrid
      playlists={playlists}
    />
  )
};

Home.getInitialProps = async  ({ req, res }) => {
  if (res) {
    const mongoose = await req.mongodb;
    const Playlist = await mongoose.models.Playlist;
    const playlists = await Playlist.find(
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
    return { playlists };
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

export const config = { amp: 'hybrid' };
export default Home;
