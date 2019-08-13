import mongoose = require('mongoose');
import Types = mongoose.Types;
import ObjectId = Types.ObjectId;

export interface Playlist{
  playlist_slug: string
  background_image_url: string
  spotify_uri: string
  playlist_image_url: string
  playlist_author: string
  playlist_name: string
  _id: ObjectId
}