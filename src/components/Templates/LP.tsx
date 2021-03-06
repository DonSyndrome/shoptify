import React from "react";
import styles from '../../styles/index';
import CTAButton from '../Atoms/CTAButton';
import Image, { Layout } from '../Atoms/Image';
import createLink from '../../utils/createLink';


const LP = props => {
  const {
    image_url,
    name,
    author,
    query_params,
    background_image_url
  } = props.data;
  const link = createLink(query_params);
  return (

    <div className={'playlist-container'}>
      <div className={'card'}>
        <div className={'image-container'}>
          <Image
            alt={name}
            src={image_url}
            width="300"
            height="300"
            layout={Layout.responsive}
            maxWidth="450"
          />
          <div className={'texts'}>
            <div>
              <h4>{name}</h4>
              <h3>By {author}</h3>
            </div>
          </div>
          <div className="cta-container">
            <a href={link}>
              <CTAButton>
                Listen Now
              </CTAButton>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
              .playlist-container {
                ${styles.mixins.heroMinHeight}
                height: 100%;
                width: 100%;
                padding: 2em;
                margin: auto;
                background-image:linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 23%, rgba(0,0,0,0.25) 100%),url(${background_image_url});
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center; 
                display: flex;
                flex-direction: column;
                justify-content: center;
                color:${styles.colors.SpotifyWhite};
              }
              .card {
                text-align: center;
              }
              .card img {
                box-shadow: 0px 10px 13px -11px rgba(79,79,79,1);

              }
              .texts {
                display:flex;
                flex-direction:column;
                justify-content: center;
                text-shadow: 2px 2px 4px rgba(84,84,84,0.53);
                margin:10px 0 10px 0;
              }
              
              .image-container {
                margin:0 auto;
              }
  
              .cta-container {
                text-align: center;
                margin:0 20px 0 20px;
              }
              
              h4 {
                font-size:1.7rem;
                font-weight:200;
                margin:0;
              }
              h3 {
                margin: 0;
                opacity: .8;
                font-size:1rem;
                font-weight:100;
              }
              a {
                padding: 0 10px;
              }
    `}</style>
    </div>

  )
}
export default LP