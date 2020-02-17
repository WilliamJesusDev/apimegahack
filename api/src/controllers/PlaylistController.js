const Playlist = require("../models/Playlist");

module.exports = {
  async index(req, res) {
    const playlists = await Playlist.find()
      .sort([["publishedAt", -1]])
      .populate({
        path: "movies",
        select: "_id title description -playlist"
      });

    return res.json(playlists);
  },
  async show(req, res) {
    const { _id } = req.params;
    const playlist = await Playlist.findOne({ _id }).populate({
      path: "movies",
      select: "_id title description -playlist"
    });

    return res.json(playlist);
  },
  async create(req, res) {
    const {
      _id,
      title,
      publishedAt = new Date(),
      description = "",
      thumbnails = {},
      categorie = 0,
      movies = []
    } = req.body;

    const playlist = await Playlist.findOneAndUpdate(
      { _id },
      {
        _id,
        title,
        publishedAt,
        description,
        thumbnails,
        categorie,
        movies
      },
      { upsert: true, new: true }
    );

    return res.json(playlist);
  },
  async update(req, res) {
    const { _id } = req.params;
    const {
      title,
      publishedAt = new Date(),
      description = "",
      thumbnails = {},
      categorie = 0,
      movies = []
    } = req.body;

    const playlist = await Playlist.findOneAndUpdate(
      { _id },
      {
        _id,
        title,
        publishedAt,
        description,
        thumbnails,
        categorie,
        movies
      },
      { upsert: true, new: true }
    );

    return res.json(playlist);
  },
  async delete(req, res) {
    const { _id } = req.params;
    await Playlist.deleteOne({ _id });

    return res.json({
      message: `The Playlist with id ${_id} has been successfully deleted`
    });
  }
};
