const jwt = require("jsonwebtoken");
const User = require("../models/User");
const private = process.env.PRIVATE_KEY || "megahack";

const { login, logout } = require("../services/auth");

module.exports = {
  async session(req, res) {
    const { email, password } = req.body;
    const hashedPass = jwt.sign(password, private);
    let response = await User.findOne({ email, password: hashedPass }).select(
      "_id name email"
    );

    if (!response) {
      return res.status(404).send("User not Find");
    }
    const token = login(email);

    const user = {
      ...response._doc,
      token
    };

    return res.json(user);
  },
  async logoff(req, res) {
    const { email } = req.params;
    logout(email);
    return res.json({ message: "logoff with success" });
  }
};
