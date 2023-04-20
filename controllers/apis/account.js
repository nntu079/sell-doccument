const express = require("express");
const jwt = require("jsonwebtoken");

const posgre = require("../../postgre");

const router = express.Router();

router.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let phone = req.body.phone;
  let email = req.body.email;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let fullname = req.body.fullname;

  posgre.pool.query(
    "INSERT INTO account(username,password,phone,email,birthday,gender,fullname) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [username, password, phone, email, birthday, gender,fullname],
    (error, results) => {
      if (error) {
        res.json({ error: error });
        return;
      }
      res.json({
        message: "Register account successfully",
      });
      return;
    }
  );
});

router.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  posgre.pool.query(
    "SELECT * from account WHERE username = $1 and password = $2",
    [username, password],
    (error, results) => {
      if (error) {
        console.log(error)
        res.sendStatus(400);
        return;
      }
      const rows = results.rows;

      if (rows.length != 1) {
        res.sendStatus(400);
        return;

      } else {
        let token = jwt.sign(
          {
            username: username,
            role: rows[0].role,
          },
          "XVIDEOS.COM",
          { expiresIn: "1h" }
        );
    
        res.send({ token: token, user: rows[0] });
        return
      }
    }
  );
});


module.exports = router;
