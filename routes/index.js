const routes = require('express').Router();
const { register } = require('../controllers/auth');

routes.get('/', (req, res) => {
  res.json({ msg: 'Connected to Express!' });
});

routes.post('/register', register);

module.exports = routes;
