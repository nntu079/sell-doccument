const express = require("express");

const loginRoutes = require("./login")
const homeRoutes =require("./home")

const router = express.Router();

router.use("/login",loginRoutes);
router.use("/home",homeRoutes)

module.exports = router;
