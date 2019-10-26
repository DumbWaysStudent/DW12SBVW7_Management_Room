'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op;
const hash = require('../helpers/bcrypt').hash;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Please provide a valid email address.',
          },
          isUnique: function(val) {
            return User.findOne({
              where: {
                email: val,
                id: { [Op.ne]: this.id },
              },
            })
              .then(result => {
                if (result) throw 'Email already in use!';
              })
              .catch(err => {
                throw err;
              });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty.',
          },
        },
      },
    },
    {},
  );
  User.beforeCreate(user => {
    user.password = hash(user.password);
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
