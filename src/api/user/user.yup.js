/* eslint-disable camelcase */
const Yup = require('yup');

const PlaylistYupSchema = Yup.object().shape({
  display_name: Yup.string(), // The name displayed on the user’s profile.
  email: Yup.string(),
  spotify_id: Yup.number(), // The Spotify user ID for the user.
  role: Yup.string(), //
});

module.exports = PlaylistYupSchema;
