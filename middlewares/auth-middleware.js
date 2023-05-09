const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const secretConfig = require("../secret-config.json");

// 시크릿 키 정의
const secretKey = secretConfig.jwtSecret;

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  let userId;

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

  try {
    const { userId } = jwt.verify(authToken, secretKey);
    userId = userId;
  } catch (err) {
    console.error(err.stack);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다."
    });
  }

  // 닉네임은 있지만 실제 DB에 유저가 없는 경우에 대한 로직 추가
  const user = await User.findById(userId);
  if (user === null) {
    console.log("userId 값을 찾을 수 없습니다.");
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다."
    });
  }
  res.locals.user = user;
  next();
};
