const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

const SecretKey = 'fgdvfdgfwudsdasdfwifsehrfgwes98r84ryhewwejfdfdhfgd';
//Register a new User
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, SecretKey).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (Object.keys(err.keyPattern)[0] === 'username') {
      res.status(500).json(`The ${Object.keys(err.keyPattern)[0]} is already taken`);
    } else {
      res.status(500).json(`The ${Object.keys(err.keyPattern)[0]} is already taken`);
    }
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json('Wrong credentials');

    const bytes = CryptoJS.AES.decrypt(user.password, SecretKey);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password && res.status(401).json('Wrong credentials');

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
