"use strict";

const mongoose = require("mongoose"),
      Schema = mongoose.Schema,
      mongoosePaginate = require("mongoose-paginate");

let PlaylistSchema = new Schema(
  {
    playlist_slug: { type: String, unique: true },
    playlist_name: { type: String },
    spotify_uri:  { type: String },
    background_image_url:  { type: String },
    description:  { type: String },
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

// plugins
PlaylistSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Playlist", PlaylistSchema);
