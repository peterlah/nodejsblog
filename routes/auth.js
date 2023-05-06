const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const User = require("../schemas/user");

// 시크릿 키 정의
const secretKey = "lswsecretkey1357";

// 로그인 API
router.post("/auth", async (req, res) => {
  const { nickname, password } = req.body;

  const user = await User.findOne({ nickname });

  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다.
  if (!user || password !== user.password) {
    return res.status(400).json({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
    });
  }

  const token = jwt.sign({ userId: user.userId }, secretKey);

  res.cookie("Authorization", `Bearer ${token}`, { secure: false }); // JWT를 Cookie로 할당합니다!
  res.status(200).json({ token }); // JWT를 Body로 할당합니다!
});

module.exports = router;
