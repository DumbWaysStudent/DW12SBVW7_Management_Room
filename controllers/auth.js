const { User } = require('../models');
const jwt = require('jsonwebtoken');
const compare = require('../helpers/bcrypt').compare;

module.exports = {
  async register(req, res) {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const response = await User.create(newUser);
      const data = {
        id: response.id,
        email: response.email,
      };
      const token = jwt.sign(data, process.env.KEY);
      res.status(201).json({
        email: response.email,
        access_token: token,
      });
    } catch (error) {
      const errMsg = error.errors[0].message;
      res.status(400).json({ error: errMsg });
    }
  },
};
