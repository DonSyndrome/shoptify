const mongoose = require('mongoose');
const UserSchema = require('./user.model');

UserSchema.statics = {
  create(data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  get(query, cb) {
    this.find(query, cb);
  },
  getBySlug(query, cb) {
    this.findOne(query, cb);
  },
  update(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },
  delete(query, cb) {
    this.findOneAndDelete(query, cb);
  },
};
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
