const express = require("express");
const router = express.Router();

// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 모델 가져오기
const { Posts } = require("../models");

// 인증을 위한 미들웨어 가져오기
const authMiddleware = require("../middlewares/auth-middleware");

// 전체 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: ["postId", "name", "nickname", "createdAt", "updatedAt"],
      order: [['createdAt', 'ASC']],
    });
    return res.status(200).json({ data: posts });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errorMessage: "서버에서 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다."
    })
  }
});

// 게시글 작성 API
router.post("/posts", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
    const { name, content } = req.body;
  
    const createPost = await Posts.create({ name, nickname, content, UserId: userId });
    return res.json({ message: "게시글을 생성하였습니다." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errorMessage: "서버에서 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다."
    })
  }
});

// 게시글 조회 API
router.get("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const post = await Posts.findOne({
      attributes: ["name", "nickname", "content", "createdAt", "updatedAt" ],
      where: { 
        [Op.and]: [ { postId }, { UserId: userId } ]
      }
    });
    return res.status(200).json({ data: post });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errorMessage: "서버에서 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다."
    })
  }
});

// 게시글 수정 API
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { name, content } = req.body;

    // 게시글 존재 여부 확인
    const post = await Posts.findOne({
      where: { 
        [Op.and]: [ { postId }, { UserId: userId } ]
      }
    });

    if (!post) {
      return res.status(404).json({
        Message: "해당 게시글을 찾을 수 없습니다.",
      });
    } else if (post.UserId !== userId) {
      return res.status(401).json({ 
        Message: "권한이 없습니다." 
      });
    };

    // 게시글 내용 변경
    const putPost = await Posts.update(
      { // name, content 컬럼을 수정
        name: name,
        content: content
      },
      {
        where: {
          [Op.and]: [ { postId }, { UserId: userId } ]
        }
      },
    );

    return res.status(200).json({
      message: "게시글을 수정하였습니다.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errorMessage: "서버에서 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다."
    })
  }
});

// 게시글 삭제 API
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    // 게시글 존재 여부 확인
    const post = await Posts.findOne({
      where: { postId }
    });

    if (!post) {
      return res.status(404).json({
        Message: "해당 게시글을 찾을 수 없습니다.",
      });
    } else if (post.UserId !== userId) {
      return res.status(401).json({ 
        Message: "권한이 없습니다." 
      });
    };

    // 게시글 내용 삭제
    const deletePost = await Posts.destroy({ 
      where: {
        [Op.and]: [{ postId }, { UserId: userId }]
      }
    });
    return res.json({
      message: "게시글을 삭제하였습니다.",
    });
  } catch (error) {
    console.log(err);
    res.status(500).send({
      errorMessage: "서버에서 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다."
    })
  }
});

// export router/post.js
module.exports = router;
