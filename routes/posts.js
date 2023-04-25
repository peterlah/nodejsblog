const express = require("express");
const router = express.Router();

// 스키마 가져오기
const Post = require("../schemas/post");

// 전체 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
	const postAll = await Post.find({});
	const getPost = postAll.map((value) => {
		return {
			name: value["name"],
			author: value["author"],
			date: value["date"]
		}
	})

	// 작성 날짜 기준 내림 차순 정렬
	getPost.sort((a,b) => b.date - a.date)

	return res.json({post: getPost});
})

// 게시글 작성 API
router.post("/posts", async (req, res) => {
	const { postId, name, author, password, content } = req.body;

	const post = await Post.find({ postId });
	if (post.length) {
    return res.status(400).json({ 
			success: false, 
			errorMessage: "이미 있는 데이터입니다." 
		});
	}

	// 현재 시간 객체 생성
	const date = new Date();

	const createPost = await Post.create({ postId, name, author, password, content, date });
	return res.json({post: createPost});
})

// 게시글 조회 API
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
	const post = await Post.find({postId: Number(postId)});
	if (!post.length) {
		return res.status(404).json({
			success: false,
			errorMessage: "해당 게시글을 찾을 수 없습니다."
		});
	}
	const getPost = post.map((value) => {
		return {
			name: value["name"],
			author: value["author"],
			date: value["date"],
			content: value["content"]
		}
	})

	return res.json({post: getPost});
});

// 게시글 수정 API
router.put("/posts/:postId", async (req, res) => {
	const { postId } = req.params;
	const { password } = req.query;
	const { name, author, content } = req.body;

	// 게시글 존재 여부 확인
	const post = await Post.find({postId: Number(postId)});
	if (!post.length) {
		return res.status(404).json({
			success: false,
			errorMessage: "해당 게시글을 찾을 수 없습니다."
		});
	}

	// 비밀번호 비교
	if (password !== post[0]["password"]) {
		return res.status(400).json({
			success: false,
			errorMessage: "비밀번호가 일치하지 않습니다."
		});
	}

	// 내용 변경
	const putPost = await Post.updateOne({
		postId: Number(postId)
	}, {
		$set:{
			name: name,
			author: author,
			content: content
		}
	})

	return res.json({
		post: putPost,
		result: "success" 
	});
})

// 게시글 삭제 API
router.delete("/posts/:postId", async (req, res) => {
	const { postId } = req.params;
	const { password } = req.query;

	// 게시글 존재 여부 확인
	const post = await Post.find({postId: Number(postId)});
	if (!post.length) {
		return res.status(404).json({
			success: false,
			errorMessage: "해당 게시글을 찾을 수 없습니다."
		});
	}

	// 비밀번호 비교
	if (password !== post[0]["password"]) {
		return res.status(400).json({
			success: false,
			errorMessage: "비밀번호가 일치하지 않습니다."
		});
	}

	// 내용 삭제
	const deletePost = await Post.deleteOne({
		postId: Number(postId)
	})

	return res.json({
		post: deletePost,
		result: "success" 
	});
})

// comments의 라우터 구성
const commentsRouter = require("./comments");
router.use("/posts/:postId", commentsRouter);

// export router/post.js
module.exports = router;