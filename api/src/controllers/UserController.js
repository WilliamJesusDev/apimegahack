const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const users = await User.find()

    return res.json(users)
  },
  async show(req, res) {
    const { _id } = req.params
    const user = await User.findOne({ _id })

    return res.json(user)
  },
  async create(req, res) {
    const {
      name,
      email,
      password,
    } = req.body

    const movie = await User.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password,
      },
      { upsert: true, new: true }
    )

    return res.json(movie)
  },
  async update(req, res) {
    const { _id } = req.params
    const {
      name,
      email,
      password,
    } = req.body

    const movie = await User.findOneAndUpdate(
      { _id },
      {
        _id,
        name,
        email,
        password,
      },
      { upsert: true, new: true }
    )

    return res.json(movie)
  },
  async delete(req, res) {
    const { _id } = req.params
    await User.deleteOne({ _id })

    return res.json({ message: `The Movie with id ${_id} has been successfully deleted` })
  },
}