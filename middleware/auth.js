const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Check to see if there is a token in the req.header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If there is a token,
  try {
    // Pull out the payload (decoded = payload)
    const decoded = jwt.verify(token, config.get('jwtSecret')); // token payload
    // decoded = {
    //   user: {
    //     id: '5f61f1abc95fd327cdb86f71',
    //   },
    //   iat: 1600254379,
    //   exp: 1600614379,
    // };
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
