const express = require("express");

const posgre = require("../../postgre");

const router = express.Router();

router.post("/get-images",(req,res)=>{
  let id = req.body.id;

  posgre.pool.query(
    "SELECT * from document_img where id_document = $1",
    [id],
    (error, results) => {
      if (error) {
        res.json({ error: error, isError: true });
        return;
      }
      const images = results.rows;

      
      let respond = []
      for (const iterator of images) {
        let image = iterator.image.toString('base64')
        respond.push({
          id:iterator.id,
          id_document:iterator.id_document,
          image:image
        })
      }

      res.json({ respond });
    }
  );
})

router.post("/get-all",(req,res)=>{
  let page = 0
  if(req.body.page){
    page = req.body.page-1
  }

  let keyword =""
  if(req.body.keyword){
    keyword=normalizeTiengViet(req.body.keyword).toLowerCase()
  }

  console.log(keyword)
  
  let size = 8
  let offset = page*size

  posgre.pool.query(`select * from document
  where lower(unaccent(title))  ~* '${keyword}' or lower(unaccent(description))  ~* '${keyword}'
  ORDER BY create_at DESC
  OFFSET $1 LIMIT $2`, [offset, size], (error, data) => {
    if (error) {
      res.json({ error: error });
      return
    }
    res.json({
      data:data?.rows,
    });
  });

})

function normalizeTiengViet(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\s/g, '|');
  // str = str.replace(/\W+/g, ' ');
  // 
  return str;
}

module.exports = router;
