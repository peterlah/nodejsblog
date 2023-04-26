const express = require("express");
const router = express.Router({ mergeParams: true });

// 스키마 가져오기
const Comment = require("../schemas/comment");

// 댓글 목록 조회 API
router.get("/comments", async (req, res) => {
  const postId = req.params.postId;
	const commentAll = await Comment.find({postId});
	const getComment = commentAll.map((value) => {
		return {
			date: value["date"],
			content: value["content"]
		}
	})
	getComment.sort((a,b) => b.date - a.date)

	return res.json({
		data: getComment
	});
});

// 댓글 작성 API
router.post("/comments", async (req, res) => {
  const postId = req.params.postId;
	const { commentId, content } = req.body;

	const CheckId = await Comment.find({
		$and: [
			{postId},
			{commentId}
		]
	})
	if (CheckId.length) {
    return res.status(400).json({  
			errorMessage: "이미 있는 데이터입니다." 
		});
	}
	if (!content.length) {
		return res.status(400).json({
			errorMessage: "댓글 내용을 입력해주세요."
		});
	}

	// 현재 시간 객체 생성
	const date = new Date();

	const createContent = await Comment.create({ commentId, postId, content, date });
	
	return res.json({
		message: "댓글을 생성하였습니다."
	});
});

// 댓글 수정 API
router.put("/comments/:commentId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
	const { content } = req.body;

	const CheckId = await Comment.find({
		$and: [
			{postId},
			{commentId}
		]
	})
	if (!CheckId.length) {
    return res.status(404).json({ 
			errorMessage: "댓글이 존재하지 않습니다." 
		});
	}
	if (!content.length) {
		return res.status(400).json({
			errorMessage: "댓글 내용을 입력해주세요."
		});
	}

	// 현재 시간 객체 생성
	const date = new Date();

	const updateComment = await Comment.updateOne({ 
		postId: Number(postId),
		commentId: Number(commentId)
	}, {
		$set:{
			content: content,
			date: date
		}
	});

	return res.json({
		message: "댓글을 수정하였습니다."
	});
});

// 댓글 삭제 API
router.delete("/comments/:commentId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

	const CheckId = await Comment.find({
		$and: [
			{postId},
			{commentId}
		]
	})
	if (!CheckId.length) {
    return res.status(404).json({ 
			errorMessage: "댓글이 존재하지 않습니다." 
		});
	}

	const deleteComment = await Comment.deleteOne({
		$and: [
			{postId},
			{commentId}
		]
	});

	return res.json({
		message: "댓글을 삭제하였습니다."
	});
});

module.exports = router;