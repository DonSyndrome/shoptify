const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  playlist_slug: { type: String, unique: true },
  spotify_uri: { type: String },
  playlist_name: { type: String },
  playlist_author: { type: String },
  background_image_url: { type: String },
  playlist_image_url: { type: String },
}, {
  // createdAt,updatedAt fields are automatically added into records
  timestamps: true,
});

// plugins
PlaylistSchema.plugin(mongoosePaginate);

// // const Playlist = mongoose.models.Playlist || mongoose.model("Playlist", PlaylistSchema);
// const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = PlaylistSchema;
