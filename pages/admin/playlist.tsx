
import React, { Component } from 'react';
import getSiteURL from '../../src/utils/getSiteURL';
import PlaylistsTable from '../../src/components/Templates/PlaylistsTable';
import { Playlist } from '../../src/models/Playlist.model';

type Props = {
  data:Playlist[]
}
type State = {
  data:Playlist[]
}


class Page extends Component<Props,State> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  static async getInitialProps ({ req, res }) {
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
        (err, docs) => {
          if (err) {
            console.log(err);
            return {};
          }
          return docs;
        },
      );
      console.log(data);
  
      return { data };
    }
    return {};
  };

  componentDidMount() {
    if (!this.props.data) {
      const url = `${getSiteURL()}/api/playlist`;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            alert(`problem With Server${JSON.stringify(response)}`);
          }
          return (response);
        })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            data: response.doc,
          });
        });
    }
  }

  render() {
    let playlistsData:Playlist[] = [];
    if (this.props.data && this.props.data.length > 0) {
      playlistsData = this.props.data;
    } else {
      playlistsData = this.state.data;
    }
    return (
      <PlaylistsTable
        data={playlistsData}
      />

    );
  }
}



export default Page;
