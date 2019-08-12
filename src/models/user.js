"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  mongoosePaginate = require("mongoose-paginate");

let userSchema = new Schema(
  {
    display_name: { type: String },//	The name displayed on the user’s profile. null if not available.
    email: { type: String },
    spotify_id: { type: Number }, // The Spotify user ID for the user.
    role: { type: String },
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

// plugins
employeeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
