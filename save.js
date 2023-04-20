app.post(
    "/api/delete-payment",
    authen.checkLogin,
    multer.text_only,
    (req, res) => {
      let user_name = req.decoded.user_name;
      let document_id = req.body.document_id;
  
      posgre.client.query(
        `DELETE FROM payment 
        WHERE user_name='${user_name}' and document_id='${document_id}' `,
        []
      );
  
      res.send("success");
    }
  );
  
  app.post(
    "/api/add-payment",
    authen.checkLogin,
    multer.text_only,
    (req, res) => {
      let user_name = req.decoded.user_name;
      let document_id = req.body.document_id;
  
      posgre.client.query(
        "insert into payment(user_name, document_id) values ($1,$2)",
        [user_name, document_id]
      );
    }
  );
  
  app.post(
    "/api/delete-favorites",
    authen.checkLogin,
    multer.text_only,
    (req, res) => {
      let user_name = req.decoded.user_name;
      let document_id = req.body.document_id;
  
      posgre.client.query(
        `DELETE FROM favorites 
        WHERE user_name='${user_name}' and document_id='${document_id}' `,
        []
      );
  
      res.send("success");
    }
  );
  
  app.post(
    "/api/add-favorites",
    authen.checkLogin,
    multer.text_only,
    (req, res) => {
      let user_name = req.decoded.user_name;
      let document_id = req.body.document_id;
  
      posgre.client.query(
        "insert into favorites(user_name, document_id) values ($1,$2)",
        [user_name, document_id]
      );
      res.send("success");
    }
  );
  
  app.post(
    "/api/upload-document",
    authen.checkLogin,
    multer.upload_file,
    (req, res) => {
      let document_id = uuidv4();
      let name = req.body.name || null;
      let description = req.body.description || null;
      let school = req.body.school || null;
      let type = req.body.type || null;
      let _class = req.body.class || null;
      let system = req.body.system || null;
      let semester = req.body.semester || null;
      let ship = req.body.ship || null;
      let prices = req.body.prices || 0;
  
      let file1 = req.files["file"] || [];
      let images = req.files["images"] || [];
  
      posgre.client.query(
        `insert into document(document_id,name,description,school,type,class,system,semester,ship,prices) 
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          document_id,
          name,
          description,
          school,
          type,
          _class,
          system,
          semester,
          ship,
          prices,
        ]
      );
  
      for (const iterator1 of file1) {
        let document_file = fs.readFileSync(iterator1.path);
        let file_id = uuidv4();
        posgre.client.query(
          "insert into file_documents(file_id,document_id,data,type) values ($1,$2,$3,$4)",
          [file_id, document_id, document_file, "pdf"]
        );
  
        for (const iterator2 of images) {
          let image_file = fs.readFileSync(iterator2.path);
          let file_id = uuidv4();
  
          posgre.client.query(
            "insert into file_documents(file_id,document_id,data,type) values ($1,$2,$3,$4)",
            [file_id, document_id, image_file, "image"]
          );
        }
      }
  
      res.send("success");
  
      //client.query('insert into file_documents(file_id,file_document) values ($1,$2)', [uuid, file1])
  
      //let uuid = uuidv4();
      //var file1 = fs.readFileSync(req.file.path);
  
      //client.query('insert into file_documents(file_id,file_document) values ($1,$2)',
      //    [uuid, file1])
    }
  );
  
  app.post("/api/gel-all-document", (req, res) => {
    posgre.client
      .query(
        `select  document_id,name, description
      from document`,
        []
      )
      .then((result) => {
        res.send(result.rows);
      });
  });
  
  app.post("/api/get-detail", authen.checkLogin, multer.text_only, (req, res) => {
    let document_id = req.body.document_id || null;
    let user_name = req.decoded.user_name || null;
  
    postgre.client
      .query(
        `select * 
    from payment 
    where document_id='${document_id}' and user_name ='${user_name}'`
      )
      .then((result) => {
        let data = result.rows;
  
        let isPayment = false;
        if (data.length == 1) {
          isPayment = true;
        }
  
        posgre.client
          .query(
            `select d.document_id, d.name, d.description, f.data, f.type, d.prices
      from document as d,file_documents as f
      where d.document_id = f.document_id and d.document_id='${document_id}'`,
            []
          )
          .then((result) => {
            let data = result.rows;
  
            if (data[0].prices == 0) {
              isPayment = true;
            }
  
            if (isPayment) {
              res.send(result.rows);
            } else {
              res.sendStatus(400);
            }
          });
      });
  });