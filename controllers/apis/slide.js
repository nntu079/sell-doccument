const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const multer = require("../../middleware/multer");
const authen = require("../../middleware/authentication");
const posgre = require("../../postgre");

const router = express.Router();

router.post("/upload", authen.checkLogin, multer.upload_file, (req, res) => {

  const role = req.decoded.role;

  if (role != "admin") {
    res.json({ message: "You are not admin" });
  }
  
  const files = req.files["files"];
  const images = req.files["images"];
  const data = req.body;
  
  //document
  let id = uuidv4();
  let title = data.title || null;
  let price = 0;
  if (data.price != "undefined" && data.price != "") {
    console.log(data.price);
    price = data.price;
  }
  let description = data.description || null;
  let type = "slide" ;
  
  //slide
  let author = req.body.author
  let school = req.body.school
  

  posgre.pool.query(
    "INSERT INTO document(id,title,price,description,type) VALUES ($1,$2,$3,$4,$5)",
    [id, title, price, description, type],
    (error, _) => {
      if (error) {
        console.log(error);
      }
    }
  );

  posgre.pool.query(
    "INSERT INTO slide(id,author,school) VALUES ($1,$2)",
    [id, author,school],
    (error, _) => {
      if (error) {
        console.log(error);
      }
    }
  );

  if (files) {
    for (const iterator of files) {
      let document_file = fs.readFileSync(iterator.path);

      posgre.pool.query(
        "INSERT INTO document_file(id_document,file) VALUES ($1,$2)",
        [id, document_file],
        (error, _) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
  }

  if (images) {
    for (const iterator of images) {
      let document_image = fs.readFileSync(iterator.path);

      //let document_image_to_string = document_image.toString('base64')

      posgre.pool.query(
        "INSERT INTO document_img(id_document,image) VALUES ($1,$2)",
        [id, document_image],
        (error, _) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
  }

  res.json({ message: "Upload successfully", isError: false });
});

router.post("/slide-detail", (req, res) => {

    let id = req.body.id;
    
    posgre.pool.query(
      "SELECT * from slide where id = $1",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error: error, isError: true });
          return;
        }
        const slide = results.rows[0];
  
        posgre.pool.query(
          "SELECT * from document where id = $1",
          [id],
          (error, results) => {
            if (error) {
              res.json({ error: error, isError: true });
              return;
            }
            const document = results.rows[0];

            res.json({document,slide})
          }
        );
      }
    );
  });

module.exports = router;
