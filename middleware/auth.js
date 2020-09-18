const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get token from header
  // - x-auth-token = key to the token inside the header.
  const token = req.header('x-auth-token');

  // Check to see if there is a token in the header
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    // Get a specific user by id by deecoding the token.
    // jwt.verify(token, secretOrPublicKey, [options, callback]) (https://github.com/auth0/node-jsonwebtoken)
    const decodedPayload = jwt.verify(token, config.get('jwtSecret'));
    // decodedPayload = {
    //   user: {
    //     id: '5f61f1abc95fd327cdb86f71',
    //   },
    //   iat: 1600254379,
    //   exp: 1600614379,
    // };

    req.user = decodedPayload.user; // { id: '5f61f1abc95fd327cdb86f71' }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
