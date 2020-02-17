const jwt = require("jsonwebtoken");
require("dotenv").config();

const private = process.env.PRIVATE_KEY || "megahack";
const email = process.env.ADMIN_EMAIL || "admin@email.com";

module.exports = {
  login(email) {
    const token = jwt.sign({ email }, private, { expiresIn: "2h" });
    return token;
  },
  logout(email) {
    const token = jwt.sign({ email }, private, { expiresIn: "0h" });
    return token;
  },
  isAuth(req, res, next) {
    const { x_jwt_token } = req.query;

    jwt.verify(x_jwt_token, private, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        return res.status(401).send("Unauthorized");
      }
    });
  },
  isAdmin(req, res, next) {
    const { x_jwt_token } = req.query;

    jwt.verify(x_jwt_token, private, function(err, decoded) {
      if (decoded.email === email) {
        return next();
      } else {
        return res.status(401).send("Unauthorized");
      }
    });
  }
};
