const express = require("express");

const login = require("../../serivices/login");

const router = express.Router();

router.get("/", login.getLogin);

router.post("/", login.postLogin);

module.exports = router;
