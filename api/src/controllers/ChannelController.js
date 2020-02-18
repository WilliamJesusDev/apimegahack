const Channel = require("../models/Channel");

module.exports = {
  async index(req, res) {
    const channels = await Channel.find()
      .sort("title")
      .populate({
        path: "categories",
        select: "_id title"
      });

    return res.json(channels);
  },
  async show(req, res) {
    const { _id } = req.params;
    const channel = await Channel.findOne({ _id }).populate({
      path: "categories",
      select: "_id title"
    });

    return res.json(channel);
  },
  async showOnCategories(req, res) {
    const response = await Channel.find()
      .sort("title")
      .populate({
        path: "categories",
        select: "_id title"
      });

    //const channels = response.filter(channel => channel.categories.length > 0);
    return res.json(response);
  },
  async showOnPlaylists(req, res) {
    const response = await Channel.find()
      .sort("title")
      .populate({
        path: "categories",
        select: "_id title playlists",
        populate: {
          path: "playlists",
          select: "_id title description movies -categorie"
        }
      });

    let channelsResponse = response.filter(
      channel => channel.categories.length > 0
    );

    const channels = channelsResponse.map(channel =>
      channel.categories.filter(categorie => categorie.playlists.length > 0)
    );

    return res.json(channels);
  },
  async create(req, res) {
    const {
      title,
      description = "",
      categories = [],
      thumbnails = []
    } = req.body;

    const channel = await Channel.findOneAndUpdate(
      { title },
      { title, description, categories, thumbnails },
      { upsert: true, new: true }
    );

    return res.json(channel);
  },
  async createByUser(req, res) {
    const { _id: user } = req.params;
    const { title = "principal", categories = [] } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Bad Request UserId is necessary!" });
    }
    const channel = await Channel.findOneAndUpdate(
      { title, user },
      { title, categories, user },
      { upsert: true, new: true }
    );

    return res.json(channel);
  },
  async update(req, res) {
    const { _id } = req.params;
    const {
      title,
      description = "",
      categories = [],
      thumbnails = []
    } = req.body;

    const channel = await Channel.findOneAndUpdate(
      { _id },
      { title, description, categories, thumbnails },
      { upsert: true, new: true }
    );

    return res.json(channel);
  },
  async delete(req, res) {
    const { _id } = req.params;
    await Channel.deleteOne({ _id });

    return res.json({
      message: `The Channel with id ${_id} has been successfully deleted`
    });
  }
};
