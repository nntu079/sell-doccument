const express = require("express");
const jwt = require("jsonwebtoken");

const posgre = require("../postgre")

const getLogin = (req, res) => {
  res.render("login");
};

const postLogin = (req, res) => {
 
};

module.exports = {
  getLogin,
  postLogin,
};
