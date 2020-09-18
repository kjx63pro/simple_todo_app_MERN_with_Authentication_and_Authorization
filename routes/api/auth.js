const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route     POST api/auth
// @desc      Login user & get token
// @access    Private
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });
    // Email Credentials
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    // Password credentials
    //   Compare the password in the login screen and the hashed password in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(
      {
        payload,
      },
      config.get('jwtSecret'),
      { expiresIn: 60 * 60 }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Errors');
  }
});
module.exports = router;
