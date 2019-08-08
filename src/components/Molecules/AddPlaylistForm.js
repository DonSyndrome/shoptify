import React from "react";
import { withFormik } from "formik";
import PlaylistLP from '../Templates/PlaylistLP';
import getCockie from '../../utils/getCockie';
import { SPOTIFY_ACSESS_TOKEN_KEY } from '../../../constants';
import styles from "../../styles/index";
import TextInput from "../Atoms/TextInput";
import playlistYup from "../../api/playlist/playlist.yup";

const getSiteURL = () => process.env.SITE_URL ? process.env.SITE_URL : document.location.origin;
const refreshToken = () => {
  console.log('refresh Token Pressed')
  const refreshTokenUrl = '/refresh-spotify-token';
  var options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }
  fetch(refreshTokenUrl, options)
    .then(response => {
      if (!response.ok) {
        alert('problem With Server' + JSON.stringify(response))
      }
      return (response)
    })
    .then(response => response.json())
    .then((response) => {
      return response;
    })
};

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
    fetch(postNewPlaylist, options)
      .then(response => {
        if (!response.ok) {
          alert('problem With Server' + JSON.stringify(response))
        }
        return (response)
      })
      .then(response => response.json())
      .then((response) => {
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
    setFieldTouched,
    handleReset,
    isSubmitting,
    isValid,
    validateForm,
  } = props;

  const getPreviewFromSpotify = () => {
    setFieldTouched('playlist_slug');
    setFieldTouched('background_image_url');
    setFieldTouched('spotify_uri');
    validateForm();
    if (!errors['playlist_slug'] && !errors['background_image_url'] && !errors['spotify_uri']) {
      const spotifyGetPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${values.spotify_uri}?market=IL&fields=images%2C%20name%2C%20owner`
      const spotifyAccsesToken = getCockie(SPOTIFY_ACSESS_TOKEN_KEY);
      var obj = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${spotifyAccsesToken}`
        }
      }

      var count = 0;
      var maxTries = 2;
      while (count !== maxTries) {
        try {
          // TODO: THINK OF WAY TO GENNERATE 
          count ++;
          fetch(spotifyGetPlaylistEndpoint, obj)
            .then((response) => response.json())
            .then(function (myJson) {
              console.log(JSON.stringify(myJson));
              if (myJson && !myJson.error) {
                const playlist_image_url = myJson.images[0].url;
                const playlist_author = myJson.owner.display_name;
                const playlist_name = myJson.name;
                setFieldValue('playlist_image_url', playlist_image_url);
                setFieldValue('playlist_author', playlist_author);
                setFieldValue('playlist_name', playlist_name);
              } else if (myJson.error.status == 401) {
                refreshToken();
                throw Error(JSON.stringify({ error: myJson.error, msg: 'UnOthenticated' }))
              } else {
                throw Error(JSON.stringify({ error: myJson.error, msg: 'cant handle this' }))

              }
            })
            .catch((reason) => {
              console.log(reason);
            })
        } catch (e) {
          // handle exception
          return console.log(e);
          console.log('Refresh Token & Try Again');
        }
      }
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
            <button type="button" disabled={isSubmitting} onClick={refreshToken}>
              refresh Token
          </button>


            <br />
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


  export default MyEnhancedForm;
