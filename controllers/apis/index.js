const express = require("express");
const router = express.Router();

const accountRoutes = require("./account")
const examRoutes = require("./exam")
const documentRoutes = require("./document")
const bookRoutes = require("./book")

router.use("/account",accountRoutes);
router.use("/exam",examRoutes);
router.use("/document",documentRoutes);
router.use("/book",bookRoutes);

module.exports = router;