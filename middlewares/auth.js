const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const authenticate = (req, res, next) => {

  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    User.findByPk(decoded.id).then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    });

    req.user = decoded;
    next();
  });

};

module.exports = authenticate;
