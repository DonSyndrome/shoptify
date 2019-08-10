import React , {useState} from "react";
import { withFormik } from "formik";
import PlaylistLP from '../Templates/PlaylistLP';
import getCockie from '../../utils/getCockie';
import { SPOTIFY_ACSESS_TOKEN_KEY } from '../../../constants';
import styles from "../../styles/index";
import TextInput from "../Atoms/TextInput";
import playlistYup from "../../models/playlistYup";

const getSiteURL = () => process.env.SITE_URL ? process.env.SITE_URL : document.location.origin;

const formikEnhancer = withFormik({
  validationSchema: playlistYup,

  mapPropsToValues: ({ playlist }) => ({
    playlist_slug: '',
    background_image_url: '',
    spotify_uri: '',
    playlist_image_url: '',
    playlist_author: '',
    playlist_name: '',
    playlist_image_url: '',
    ...playlist,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    const errors = {}
    const postNewPlaylist = `${getSiteURL()}/api/playlist/`;
    // todo: fix authentications
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
    fetch(postNewPlaylist,options)
    .then(response =>{
      if (!response.ok) {
        alert('problem With Server' + JSON.stringify(response))
        errors.server = response;
      }
      return(response)
    })
    .then(response => response.json())
    .then((response)=> {
      alert('saved with sucsess' + JSON.stringify(response))
     
      return response;
    })
    setSubmitting(false);
  },
  displayName: "MyForm"
});

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleReset,
    isSubmitting,
    isValid,
    validateForm,
  } = props;
  const [ PreviewError, SetPreviewError ] = useState({
    error:'no data requested yet :D'
  });
  const getPreviewFromSpotify = (e) => {
    validateForm();
    const playlistId = values.spotify_uri;
    if (playlistId) {
      const spotifyGetPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}?market=IL&fields=images%2C%20name%2C%20owner`
      const spotifyAccsesToken = getCockie(SPOTIFY_ACSESS_TOKEN_KEY);
      var obj = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${spotifyAccsesToken}`
        }
      }

      fetch(spotifyGetPlaylistEndpoint, obj)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          console.log(JSON.stringify(myJson));
          if (myJson && !myJson.error) {
            const playlist_image_url = myJson.images[0].url;
            const playlist_author = myJson.owner.display_name;
            const playlist_name = myJson.name;
            setFieldValue('playlist_image_url',playlist_image_url);
            setFieldValue('playlist_author',playlist_author);
            setFieldValue('playlist_name',playlist_name);
          } else {
            console.log('bad response from spotify api')
          }
        }).catch((reason)=>{
          alart(JSON.stringify(reason))
        });
    }
    else {
      SetPreviewError({
        error:'cant generet preview without all the fields',
      }) 
    }
  }
  
  return (
    <div className={'layout'}>
      <div className={'form-container'}>
        <h1>
          this is the Add playlists page :D
        </h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="playlist_slug"
            type="text"
            label={`playlist slug ${values.playlist_slug && `(short url:${getSiteURL()}/playlist/${values.playlist_slug})`}`}
            placeholder="short n` chatchy"
            error={touched.playlist_slug && errors.playlist_slug}
            value={values.playlist_slug}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            id="background_image_url"
            type="text"
            label="Background image URL"
            placeholder="please enter valid background image url in 16*9"
            error={touched.background_image_url && errors.background_image_url}
            value={values.background_image_url}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            id="spotify_uri"
            type="text"
            label="spotify_uri"
            placeholder="please enter the uri of the playlist"
            error={touched.spotify_uri && errors.spotify_uri}
            value={values.spotify_uri}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button type="button" disabled={isSubmitting} onClick={getPreviewFromSpotify}>
            Preview Page
          </button>
          {
            PreviewError && PreviewError.error &&
            <p>
            {PreviewError.error}
          </p>
          }
          
          <br/>
          <button
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </button>
          <button type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </button>
       
          {/* <pre>
            {JSON.stringify(props, null, 2)}
          </pre> */}
          {/* <pre>
            {Object.keys(props).join('\n')}
          </pre> */}
        </form>
      </div>
      {
        // check that the data from spotify is present
        values.playlist_name &&
        <PlaylistLP
          playlist={values}
        />
      }
      <style jsx>{`
        .form-container{
              padding: 2em;
        }
        @media (min-width: ${styles.breakPoint.desktop}) {
          .layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

// Helper for the demo
// import { MoreResources, DisplayFormikState } from "./formik-demo";

export default MyEnhancedForm;
// to use : <MyEnhancedForm user={{ email: "", firstName: "", lastName: "" }} />
