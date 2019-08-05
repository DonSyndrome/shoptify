"use strict";

const mongoose = require('mongoose'),
  UserSchema = require("./user.model");

UserSchema.statics = {
  create : function(data, cb) {
      var user = new this(data);
      user.save(cb);
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
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;