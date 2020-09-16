const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Private
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password); // true or false

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // if a password in an input field is same as the password saved in the DB, generate a token
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 60 * 60 * 100 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg });
  }
});

module.exports = router;
