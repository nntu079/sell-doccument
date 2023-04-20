const jwt = require("jsonwebtoken");

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

function checkLogin(req, res, next) {
  let token = extractToken(req);

  jwt.verify(token, "XVIDEOS.COM", function (err, decoded) {
    
    if (err) {
      res.json({error:err,isError:true})
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = {
  checkLogin: checkLogin,
};

