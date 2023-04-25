const mongoose = require("mongoose");

// post 스키마 정의
const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
		required: true
  },
  password: {
    type: String,
		required: true
  },
  content: {
    type: String
  },
	date: {
		type: Date
	}
});

module.exports = mongoose.model("Post", postSchema);