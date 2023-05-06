const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("index 페이지 입니다.");
});

module.exports = router;
