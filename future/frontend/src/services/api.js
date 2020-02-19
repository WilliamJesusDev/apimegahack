const axios = require('axios')

const api = axios.create({
  baseURL : 'https://api-globoplay.herokuapp.com'
})

module.exports = api