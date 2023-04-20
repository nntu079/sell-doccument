const express = require("express");


const home  = require("../../serivices/home")

const router = express.Router();

router.get("/login", home.homeLogin);

router.get("/nologin", home.homeNoLogin);

module.exports = router;
