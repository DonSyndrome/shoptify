import React from 'react';
import Link from 'next/link';
import { Playlist } from '../../models/Playlist.model';


type Props = {
  data:Playlist[]
}


const PlaylistsTable = ({data}:Props) => {
  return (
      <div className="layout">
        <h1>
          this is the playlists page :D
        </h1>
        <Link href="/admin/add_playlist">
          <button type="button">
            add new landing page
          </button>
        </Link>
        <table>
          <tbody>
            {data && data.length > 0 && data.map(playlist => (
              <tr key={playlist._id + ''}>
                <td>
                  {playlist.playlist_name}
                </td>
                <td>
                  {playlist.playlist_slug}
                </td>
                <td>
                  {playlist.spotify_uri}
                </td>
                <td>
                  <Link href={`/admin/playlist/${playlist.playlist_slug}`} prefetch={false}>
                    <a>edit</a>
                  </Link>
                </td>
                <td>
                  <Link href={`/playlist/${playlist.playlist_slug}`} prefetch={false}>
                    <a>preview</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <style jsx>
          {`
          .layout {
            padding:2em;
            text-align: center;
          }

          table {
            width: 100%;
          }

          tr {
            padding: 0.7em 1em;
            outline: 2px solid #eaeaea;      
          }

          td{
            border: inherit;
          }    
      
          `}
        </style>
      </div>

    );
}

export default PlaylistsTable
