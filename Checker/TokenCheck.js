const jwt = require("jsonwebtoken");

const TokenCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "ilovereact");
    if (decode) {
      next();
    }
  } catch {
    res.status(400).json({ err: "error" });
  }
};

module.exports = TokenCheck;
