"use strict";

const mongoose = require('mongoose'),
  PlaylistSchema = require("./playlist.model");

PlaylistSchema.statics = {
  create : function(data, cb) {
      var playlist = new this(data);
      playlist.save(cb);
  },

  get: function(query, cb) {
      this.find(query, cb);
  },

  getBySlug: function(playlist_slug, cb) {
      this.findOne({playlist_slug,}, cb);
  },

  update: function(query, updateData, cb) {
      this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
  },

  delete: function(query, cb) {
      this.findOneAndDelete(query,cb);
  }
}
const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);

module.exports = PlaylistModel;