const jwt = require("jsonwebtoken");
const User = require("../models/User");
const private = process.env.PRIVATE_KEY || "megahack";

module.exports = {
  async index(req, res) {
    const users = await User.find()
      .select("_id name email")
      .populate({
        path: "channels",
        select: "_id title description categories -user"
      });

    return res.json(users);
  },
  async show(req, res) {
    const { _id } = req.params;
    const user = await User.findOne({ _id })
      .select("_id name email")
      .populate({
        path: "channels",
        select: "_id title description categories -user"
      });

    return res.json(user);
  },
  async create(req, res) {
    const { name, email, password } = req.body;
    const hashedPass = jwt.sign(password, private);
    const user = await User.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPass
      },
      { upsert: true, new: true }
    ).select("_id name email");

    return res.json(user);
  },
  async update(req, res) {
    const { _id } = req.params;
    const { name, email, password } = req.body;
    const hashedPass = jwt.sign(password, private);
    const user = await User.findOneAndUpdate(
      { _id },
      {
        name,
        email,
        password: hashedPass
      },
      { upsert: true, new: true }
    ).select("_id name email");

    return res.json(user);
  },
  async delete(req, res) {
    const { _id } = req.params;
    await User.deleteOne({ _id });

    return res.json({
      message: `The User with id ${_id} has been successfully deleted`
    });
  }
};
