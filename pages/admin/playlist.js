import React from 'react';
import Link from 'next/link'

const page =  ({data}) => (
  <div>
    <h1>
      this is the playlists page :D 
    </h1>
    <Link href={'/admin/add_playlist'}>
    <button>
      add new landing page
    </button>
    </Link>
    <ul>
    {data && data.map((playlist)=>(
      <li>
        <div>
          {playlist.playlist_name}
        </div>
        <div>
          {playlist.playlist_slug}
        </div>
        <div>
          {playlist.spotify_uri}
        </div>
        <div>
          <Link href={`/admin/playlist/${playlist.playlist_slug}`}>
            <a>edit</a>
          </Link>
        </div>
        <div>
          <Link href={`/playlist/${playlist.playlist_slug}`}>
            <a>preview</a>
          </Link>
        </div>
      </li>
      ))}
    </ul>
    <style jsx>{`
      li {
        display: flex;
      }
      li > div {
        padding: 0.5em 1em;
      }
      `}</style>
  </div>

)
page.getInitialProps = async ({ req }) => {
  if (req){
    var mongoose = await req.mongodb;
    const Playlist = await mongoose.models.Playlist;
    const data = await Playlist.find(
    {
    },
    null,
    {
      sort: { createdAt: -1 }
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
    console.log(data);

    return { data };
  } else{
    return {};
  }
}

  export default page
  