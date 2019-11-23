/* eslint-disable camelcase */
const Yup = require('yup');

const PlaylistYupSchema = Yup.object().shape({
  playlist_slug: Yup.string()
    .min(3, "C'mon, put somthing longer than that")
    .max(40, 'hey, 40 is planty')
    .required('First name is required.'),
  background_image_url: Yup.string()
    // .url('Background image url must be a url.')
    .required('Background image is required.'),
  spotify_uri: Yup.string()
    .required('no magic no mizraHits no tikwa'),
  playlist_image_url: Yup.string()
    .required('playlist image url is required'),
  playlist_author: Yup.string()
    .required('playlist author is required'),
  playlist_name: Yup.string()
    .required('playlist name is required'),
});
module.exports = PlaylistYupSchema;
