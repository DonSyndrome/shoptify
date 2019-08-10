const mongoose = require('mongoose');
const PlaylistSchema = require('./playlist.model');

PlaylistSchema.statics = {
  create(data, cb) {
    const playlist = new this(data);
    playlist.save(cb);
  },

  get(query, cb) {
    this.find(query, cb);
  },

  getBySlug(playlistSlug, cb) {
    this.findOne({ playlist_slug: playlistSlug }, cb);
  },

  update(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete(query, cb) {
    this.findOneAndDelete(query, cb);
  },
};
const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);

module.exports = PlaylistModel;
