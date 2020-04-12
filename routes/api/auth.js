const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// GET api/auth
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: 'Server error' });
  }
});

// POST api/auth

router.post(
  '/',
  [ 
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const {  email, password } = req.body;

    try {
      // check if User already exist
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch){
        res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });
      }

      //Return a webtoken (JWT)
      const payload = {
        user: {
          id: user.id
        }
      };

      

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Sometging wrong with a Server');
    }
  }
);

  module.exports = router;
