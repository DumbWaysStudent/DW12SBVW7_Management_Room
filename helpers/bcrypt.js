const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8);

module.exports = {
  hash: function(pwd) {
    return bcrypt.hashSync(pwd, salt);
  },
  compare: function(pwd, hashpwd) {
    return bcrypt.compareSync(pwd, hashpwd);
  },
};
