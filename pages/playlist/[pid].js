import React from 'react';
import { useAmp } from 'next/amp'



const index = ({ pid, data }) => {
  const isAmp = useAmp();
  return (
    <main>
      <div className={'playlist-container'}>
        <h1 className={'tomer'}>
          playlist number:{pid}
        </h1>
        <Tomer
          tomer={'lolollolololo'}
        />
        <h2>
          {isAmp}
        </h2>
        <h3>fuck</h3>
        <p>
          {JSON.stringify(data)}
        </p>
        <a href={'/login-with-spotify?folow-playlist=["2tWQ5raOOYMTs3W6y0W9Y9","4uv9UR7iPeD12LkkV7dXPm"]'}>Log in with Spotify</a>

        <style jsx>{`
          main {
            background-color: 
          }
          .playlist-container {
            width: 80%;
            margin: auto;
            text-align:center;
          }
          .tomer {
            color:blue;
            font-size:60px;
          }
    
      
      
      `}</style>
      </div>
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
const Tomer = (props) => (
  <div>
    <h1>
      {props.tomer}
    </h1>
    <style jsx>{`
    h1 {
      color:green;
      font-size:60px;
      display:grid;
    }
      
      
      `}</style>
  </div>
);
export const config = { amp: true };
export default index
