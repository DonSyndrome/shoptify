import React from 'react'
import Image, { Layout } from './Image';
import styles from '../../styles/index';
import { Playlist } from '../../models/Playlist.model';
import getSiteURL from '../../utils/getSiteURL';
type Props = {
  playlist: Playlist
}

const PlaylistCard = (props: Props) => {
  const {
    playlist_slug,
    background_image_url,
    spotify_uri,
    playlist_image_url,
    playlist_author,
    playlist_name,
  } = props.playlist;
  return (
    <div className="playlist-card">
      <Image
        alt={playlist_name}
        src={playlist_image_url}
        width="300"
        height="300"
        layout={Layout.responsive}
      />
      <div className="card-body">
        <div className="card-title-row">
          <div>
            {`<3 52`}
          </div>
          <div>
            עודכן לפני:שבוע
          </div>

        </div>
        <div className="card-description">
          <p>
            {playlist_author}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos ipsa voluptatum ex veniam consectetur,
            quam debitis vel amet eos deserunt earum fugiat dolor aut sapiente,
            id recusandae aliquid, ullam natus.
          </p>
          
          {/* <OutlineButton>
            
          </OutlineButton> */}
          
          <a href={`${getSiteURL()}/playlist/${playlist_slug}`}> 
          עקוב
          </a>
          <p className="folowers">
            5,183 עוקבים
          </p>
        </div>
      </div>


      <style jsx>{`
        .playlist-card {
            min-width:250px;
            max-width:100%;
            border-top:solid 20px ${styles.colors.SpotifyGreen};
            background-color:#e7e7e7;
        }
        .card-body {
          padding:6px;
        }

        .card-title-row {
          display:flex;
          justify-content: space-between;
          padding:2px;
        }

        .card-description {
          text-align:center;
        }

        .folowers{
          font-size:1.7em;
        }

      `}</style>
    </div>
  )
};


export default PlaylistCard