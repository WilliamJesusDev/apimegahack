import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-globoplay.herokuapp.com'
});

export default api;
