const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  let token = req.headers.authorization.substring(7);
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  next();
}

function decodeToken(req, res, next) {
  let token = req.headers.authorization.substring(7);
  let payload = jwt.decode(token);
  req.body = { ...req.body, payload };
  next();
}

module.exports = {
  verifyToken,
  decodeToken,
};
