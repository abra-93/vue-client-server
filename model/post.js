const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    _id: Number,
    avatar: String,
    title: String,
    body: String,
    images: Array,
    likes: Array,
  },
  { _id: false }
);
const posts = model("Post", postSchema);

const likeSchema = new Schema(
  {
    postId: Number,
    userId: Array,
    // likes: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { _id: false }
);
const likes = model("Likes", likeSchema);

module.exports = {
  posts,
  likes,
};
