const Movie = require('../models/Movie')

module.exports = {
  async index(req, res) {
    const movies = await Movie.find()

    return res.json(movies)
  },
  async show(req, res) {
    const { _id } = req.params
    const movie = await Movie.findOne({ _id })

    return res.json(movie)
  },
  async create(req, res) {
    const {
      _id,
      videoId,
      title,
      publishedAt = new Date(),
      description = '',
      thumbnails = {},
      playlist = ''
    } = req.body

    const movie = await Movie.findOneAndUpdate(
      { _id },
      {
        _id,
        title,
        publishedAt,
        description,
        thumbnails,
        playlist,
        videoId
      },
      { upsert: true, new: true }
    )

    return res.json(movie)
  },
  async update(req, res) {
    const { _id } = req.params
    const {
      videoId,
      title,
      publishedAt = new Date(),
      description = '',
      thumbnails = {},
      playlist = ''
    } = req.body

    const movie = await Movie.findOneAndUpdate(
      { _id },
      {
        _id,
        title,
        publishedAt,
        description,
        thumbnails,
        playlist,
        videoId
      },
      { upsert: true, new: true }
    )

    return res.json(movie)
  },
  async delete(req, res) {
    const { _id } = req.params
    await Movie.deleteOne({ _id })

    return res.json({ message: `The Movie with id ${_id} has been successfully deleted` })
  },
}