"use strict";

const mongoose = require('mongoose'),
  PlaylistSchema = require("./playlist.model");

PlaylistSchema.statics = {
  create : function(data, cb) {
      var hero = new this(data);
      hero.save(cb);
  },

  get: function(query, cb) {
      this.find(query, cb);
  },

  getBySlug: function(query, cb) {
      this.findOne(query, cb);
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