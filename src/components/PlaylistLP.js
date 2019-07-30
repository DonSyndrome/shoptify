import React from "react";
import CTAButton from './CTAButton';

const PlaylistLP = props => {
  const {
    playlist_image_url,
    playlist_name,
    playlist_author,
    spotify_uri,
    background_image_url
  } = props.playlist;
  return (
    <div className={'playlist-container'}>
      {/* altho this classLess div may see uncecery but it is */}
      <div>
        <div className={'card'}>
          <div className={'texts'}>
            <div>
              <h4>{playlist_name}</h4>
              <h3>{playlist_author}</h3>
            </div>
          </div>
          <div className={'image-container'}>
            <amp-img alt="A view of the sea"
              src={playlist_image_url}
              width="300"
              height="300"
              layout="responsive"
            />
            <div className="cta-container">
              <a href={`/login-with-spotify?folow-playlist=["${spotify_uri}"]`}>
                <CTAButton>
                  Folow in with Spotify
                                </CTAButton>
              </a>
            </div>
          </div>


        </div>
      </div>
      <style jsx>{`
              .playlist-container {
                width: 100%;
                padding: 2em;
                margin: auto;
                background-image:linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 23%, rgba(0,0,0,0.25) 100%),url(${background_image_url});
                min-height:calc(100vh - 50px);
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
              .card {
                display:flex;
                flex-direction:column;
                text-align: center;
                margin: auto;
                margin-bottom: 20px;
              }
              .card img {
                box-shadow: 0px 10px 13px -11px rgba(79,79,79,1);
              }
              .texts {
                display:flex;
                flex-direction:column;
                justify-content: center;
                padding: 2em;
                text-shadow: 2px 2px 4px rgba(84,84,84,0.53);
              }
              
              .image-container {
                margin:0 auto;
              }
  
              .cta-container {
                text-align: center;
                transform: translateY(-28px);
                margin:0 20px 0 20px;
              }
              
              h4 {
                font-size:3rem;
                font-weight:200;
                margin:0;
              }
              h3{
                font-weight:100;
                font-size:1.6rem;
              }
              
              @media (min-width: 1200px) {
                .card {
                  flex-direction: row;
                  justify-content: center;
                  max-width: 1000px;
                }
                .texts { 
                  order: 2;
                  text-align: left;
                }
                .image-container { 
                  order: 1;
                  margin: 0;
                }
              }
              

            `}
      </style>
    </div>
  )
}
export default PlaylistLP