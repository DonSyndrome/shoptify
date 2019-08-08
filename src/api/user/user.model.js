/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');
const userSchema = new Schema({
  display_name: { type: String }, // The name displayed on the user’s profile.
  email: { type: String },
  spotify_id: { type: Number }, // The Spotify user ID for the user.
  role: { type: String },
},
{
  // createdAt,updatedAt fields are automatically added into records
  timestamps: true,
});

// plugins
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
