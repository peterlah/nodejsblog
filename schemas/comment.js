const mongoose = require("mongoose");

// comment 스키마 정의
const commentSchema = new mongoose.Schema({
	commentId: {
    type: Number,
    required: true,
    unique: true
  },
	postId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
		required: true
  },
	date: {
    type: Date,
		required: true
  }
});

module.exports = mongoose.model("Comment", commentSchema);