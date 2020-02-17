const User = require('../models/User')

const { login, logout } = require('../services/auth')

module.exports = {
  async session(req, res) {
    const { email, password } = req.body
    let response = await User.findOne({ email, password }).select('_id name email')

    if (!response) {
      return res.statusCode(404).send('User not Find')
    }
    const token = login(email)

    const user = {
      ...response._doc,
      token
    }

    return res.json(user)
  },
  async logoff(req, res) {
    const { email } = req.params
    logout(email)
    return res.json({ message: 'logoff with success' })
  }
}