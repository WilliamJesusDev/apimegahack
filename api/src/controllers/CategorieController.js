const Categorie = require("../models/Categorie");

module.exports = {
  async index(req, res) {
    const categories = await Categorie.find()
      .sort("_id")
      .populate({
        path: "playlists",
        select: "_id title description -categorie"
      });

    return res.json(categories);
  },
  async show(req, res) {
    const { _id } = req.params;
    const categorie = await Categorie.findOne({ _id }).populate({
      path: "playlists",
      select: "_id title description -categorie"
    });

    return res.json(categorie);
  },
  async showOnPlaylists(req, res) {
    const response = await Categorie.find()
      .sort("_id")
      .populate({
        path: "playlists",
        select: "_id title description -categorie"
      });
    const categories = response.filter(
      categorie => categorie.playlists.length > 0
    );
    return res.json(categories);
  },
  async create(req, res) {
    const { _id, title, playlists = [] } = req.body;

    const categorie = await Categorie.findOneAndUpdate(
      { _id },
      { _id, title, playlists },
      { upsert: true, new: true }
    );

    return res.json(categorie);
  },
  async update(req, res) {
    const { _id } = req.params;
    const { title, playlists = [] } = req.body;

    const categorie = await Categorie.findOneAndUpdate(
      { _id },
      { _id, title, playlists },
      { upsert: true, new: true }
    );

    return res.json(categorie);
  },
  async delete(req, res) {
    const { _id } = req.params;
    await Categorie.deleteOne({ _id });

    return res.json({
      message: `The Category with id ${_id} has been successfully deleted`
    });
  }
};
