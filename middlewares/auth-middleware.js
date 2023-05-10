const jwt = require("jsonwebtoken");
const { Users } = require("../models");

//import dotenv from 'dotenv'
require('dotenv').config();
const env = process.env;

// 시크릿 키 정의
const secretKey = env.JWT_SECRET;

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  try {

    if (req.cookies === undefined) {
      return res.status(401).json({
        errorMessage: "로그인 후 이용 가능한 기능입니다."
      });
    }

    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" ");

    if (!authToken || authType !== "Bearer") {
      return res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다."
      });
    }
  
    // 토큰 유효성 검사 -> 유효성 검사 실패시 에러 발생 -> 에러메시지 반환
    const decodedToken = jwt.verify(authToken, secretKey);
    const userId = decodedToken.userId;

    // 닉네임은 있지만 실제 DB에 유저가 없는 경우에 대한 로직 추가
    const user = await Users.findOne({ where: { userId } });
    if (user === null) {
      console.log("userId 값을 찾을 수 없습니다.");
      res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다."
      });
    }
    res.locals.user = user;
    next();
  } 
  catch (err) {
    console.error(err.stack);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다."
    });
  }
};
