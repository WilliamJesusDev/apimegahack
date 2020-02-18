const jwt = require("jsonwebtoken");
const User = require("../models/User");
const private = process.env.PRIVATE_KEY || "megahack";

module.exports = {
  async index(req, res) {
    const users = await User.find()
      .select("-password")
      .populate({
        path: "channels",
        select: "_id title description categories -user"
      })
      .populate({
        path: "categories",
        select: "_id title description"
      })
      .populate({
        path: "playlists",
        select: "_id title description"
      });

    return res.json(users);
  },
  async show(req, res) {
    const { _id } = req.params;
    const user = await User.findOne({ _id })
      .select("-password")
      .populate({
        path: "channels",
        select: "_id title description categories -user"
      })
      .populate({
        path: "categories",
        select: "_id title description"
      })
      .populate({
        path: "playlists",
        select: "_id title description"
      });

    return res.json(user);
  },
  async update(req, res) {
    const { _id } = req.params;
    const {
      name,
      email,
      birthday,
      genre,
      document = "",
      categories = [],
      playlists = []
    } = req.body;

    const user = await User.findOneAndUpdate(
      { _id },
      {
        name,
        email,
        birthday,
        document,
        genre,
        categories,
        playlists
      },
      { upsert: true, new: true }
    ).select("-password");

    return res.json(user);
  },
  async updatePass(req, res) {
    const { _id } = req.params;
    const { password } = req.body;
    const hashedPass = jwt.sign(password, private);
    const user = await User.findOneAndUpdate(
      { _id },
      {
        password: hashedPass
      },
      { upsert: true, new: true }
    ).select("-password");

    return res.json(user);
  },
  async addPlaylists(req, res) {
    const { _id } = req.params;
    const { playlists } = req.body;

    const user = await User.findOne({ _id }).select("-password");

    playlists.map(playlist => user.playlists.push(playlist));

    await user.save();
    return res.json(user);
  },
  async addCategories(req, res) {
    const { _id } = req.params;
    const { categories } = req.body;

    const user = await User.findOne({ _id }).select("-password");

    categories.map(categorie => user.categories.push(categorie));

    await user.save();
    return res.json(user);
  }
};
