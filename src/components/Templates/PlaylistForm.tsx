import React from 'react';
import Router from 'next/router';
import { withFormik } from 'formik';
import PlaylistLP from './PlaylistLP';
import getCockie from '../../utils/browser.getCockie';
import SpotifyFetch from '../../utils/browser.SpotifyFetch';
import getSiteURL from '../../utils/getSiteURL';
import { SPOTIFY_ACSESS_TOKEN_KEY } from '../../../constants';
import styles from '../../styles/index';
import TextInput from '../Atoms/TextInput';
import playlistYup from '../../api/playlist/playlist.yup';
import { Playlist } from '../../models/Playlist.model';




function fetchPlaylist(spotify_uri) {
  const spotifyGetPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${spotify_uri}?market=IL&fields=images%2C%20name%2C%20owner`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCockie(SPOTIFY_ACSESS_TOKEN_KEY)}`,
    },
  };
  return fetch(spotifyGetPlaylistEndpoint, options)
}

type Props = {
  playlist?:Playlist
  edit: boolean
}


const formikEnhancer = withFormik({
  validationSchema: playlistYup,
  isInitialValid: (props) => {
    if (props.playlist && props.playlist.playlist_slug) {
      return true;
    }
    return false;
  },

  mapPropsToValues: (props: Props) => {
    const defaultProps = {
      playlist_slug: '',
      background_image_url: '',
      spotify_uri: '',
      playlist_image_url: '',
      playlist_author: '',
      playlist_name: '',
    };
    const playlist = props.playlist || defaultProps;
    const edit = props.edit || false;
    return {
      playlist_slug: playlist.playlist_slug,
      background_image_url: playlist.background_image_url,
      spotify_uri: playlist.spotify_uri,
      playlist_image_url: playlist.playlist_image_url,
      playlist_author: playlist.playlist_author,
      playlist_name: playlist.playlist_name,
      edit,
    }
  },
  handleSubmit: (payload, { setSubmitting }) => {

    // todo: fix authentications, switch better betwen post for the first time and update
    const isEdit = payload.edit;
    delete payload['edit'];
    const body = JSON.stringify(payload)
    let url = getSiteURL();
    let method;
    if (isEdit) {
      url += `/api/playlist/update/${payload.playlist_slug}`;
      method = 'PUT'
    } else {
      url += '/api/playlist/';
      method = 'POST'
    }
    let options = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          // alert(`problem With Server${JSON.stringify(response)}`);
          // throw Error(response.msg)
          // todo: throw somthing here to stop the flow!
        }
        return (response);
      })
      .then(response => response.json())
      .then((response) => {
        alert(`saved with sucsess${JSON.stringify(response)}`);
        Router.push(`/playlist/${payload.playlist_slug}`);

        return response;
      }).catch(err =>{
        alert(`problem With Server${JSON.stringify(err)}`);
        setSubmitting(false);
      })
  },
  displayName: 'MyForm',
});

const MyForm = (props) => {
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
    if (!errors.playlist_slug && !errors.background_image_url && !errors.spotify_uri) {
      // TODO: THINK OF WAY TO GENNERATE
      SpotifyFetch(fetchPlaylist, values.spotify_uri)
        .then((myJson: any) => {
          console.log(myJson);
          if (myJson && !myJson.error) {
            const playlist_image_url = myJson.images[0].url;
            const playlist_author = myJson.owner.display_name;
            const playlist_name = myJson.name;
            setFieldValue('playlist_image_url', playlist_image_url);
            setFieldValue('playlist_author', playlist_author);
            setFieldValue('playlist_name', playlist_name);
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
      // handle exception
      console.log('Refresh Token & Try Again');
    }
  };
  const deletePlaylist = () => {
    const url = `/api/playlist/remove/${values.playlist_slug}`
    const options = {
      method: 'DELETE',
    };
    fetch(url, options)
    .then(response => response.json())
    .then((myJson: any) => {
      if (myJson && !myJson.error) {
        alert(myJson.message);
        Router.push('/admin/playlist');
      }
    })
    .catch((reason) => {
      console.log(reason);
      alert(reason);
    });
  }

  return (
    <div className="layout">
      <div className="form-container">
        <button
          type='button'
          onClick={(e)=>Router.push('/admin/playlist')}
        >
          {'<-'} back
        </button>
        <h1>
          this is the {values.edit ? 'edit' : 'create'} playlists page :D
        </h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="playlist_slug"
            type="text"
            label={`playlist slug ${values.playlist_slug && `(short url:${getSiteURL()}/playlist/${encodeURI(values.playlist_slug)})`}`}
            placeholder="short n` chatchy"
            error={touched.playlist_slug && errors.playlist_slug}
            value={values.playlist_slug}
            onChange={handleChange}
            onBlur={handleBlur}
            disable={values.edit}
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
            {values.edit ? 'Update' : 'Submit'}
          </button>
          {
            values.edit && 
            <button type="button" onClick={deletePlaylist}>
              delete
            </button>
          }
          {/* <pre>
            {JSON.stringify(props, null, 2)}
          </pre> */}
        </form>
      </div>
      {
        // check that the data from spotify is present
        values.playlist_name
        && (
          <PlaylistLP
            playlist={values}
          />
        )
      }
      <style jsx>
        {`
        .form-container{
              padding: 2em;
        }
        @media (min-width: ${styles.breakPoint.desktop}){
          .layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
        `}

      </style>
    </div>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);


export default MyEnhancedForm;
