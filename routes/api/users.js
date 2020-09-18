const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route     POST api/users
// @desc      Register new user
// @access    Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // user
    /*
    {
      _id: 5f6436875eb0994e35d5e27f,
      name: 'Brad Traversy',
      email: 'brad2@gmail.com',
      password: '$2a$10$.4G5LWfdUTBR0xN05OE5JOJ75T76JpwM1bXoPyMuLRmL1U/GYsRWW',
      date: 2020-09-18T04:24:39.763Z,
      __v: 0
    }
    */

    const payload = {
      user: {
        id: user.id,
      },
    };

    /*
    "payload": {
      "user": {
        "id": "5f6436875eb0994e35d5e27f"
      }
    },
    */

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 60 * 60,
    });

    // token
    /*
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOiI1ZjY0MzY4NzVlYjA5OTRlMzVkNWUyN2YifX0sImlhdCI6MTYwMDQwMzA4MCwiZXhwIjoxNjAwNDA2NjgwfQ.K3seWSmc6kbKgtJHJ74q0rcfyM-RiEQmWmHD3ueOEyU"
    } 
    */
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg });
  }
});
module.exports = router;
