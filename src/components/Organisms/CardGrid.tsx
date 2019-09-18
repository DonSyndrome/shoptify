import React from "react";
import PlaylistCard from '../../../src/components/Atoms/PlaylistCard';
import { Playlist } from '../../../src/models/Playlist.model';


type Props = {
  playlists:Playlist[]
}

const CardGrid = ({playlists}: Props) => (
  <div className="grid">
    {playlists && playlists.length > 0 && playlists.map(playlist =>(
      <PlaylistCard
      key={playlist.playlist_slug}
      playlist={playlist}
    />
    ))}
    <style jsx>{`
    .grid{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-gap: 25px;
      padding: 25px;

    }
  `}</style>
  </div>
)
export default CardGrid
