const jwt = require("jsonwebtoken");

const AuthCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "ilovereact");
    res.status(200).json({
      userData: {
        _id: decode._id,
        email: decode.email,
      },
    });
    next();
  } catch {
    res.status(400).json({ err: "error" });
  }
};

module.exports = AuthCheck;
