const express = require("express");
const jwt = require("jsonwebtoken");

const posgre = require("../postgre")

const homeLogin = (req, res) => {
  res.render("homelogin",{ user : "abcd" });
};

const homeNoLogin = (req, res) => {
    res.render("homenologin");
};

module.exports = {
    homeLogin,
    homeNoLogin,
};
