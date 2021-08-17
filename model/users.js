const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    _id: Number,
    name: String,
    // postsLikes: Array,
  },
  { _id: false }
);

module.exports = model("User", userSchema);
