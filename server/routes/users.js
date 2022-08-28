const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//update
router.put('/:id', async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update password

router.put('/updatepassword/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'fgdvfdgfwudsdasdfwifsehrfgwes98r84ryhewwejfdfdhfgd').toString(CryptoJS.enc.Utf8);

  if (decryptedPassword !== req.body.oldPassword) {
    res.status(403).json('Wrong password');
  } else {
    try {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, 'fgdvfdgfwudsdasdfwifsehrfgwes98r84ryhewwejfdfdhfgd').toString();
      await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json('The password has been updated successfully');
    } catch (err) {
      res.status(500);
    }
  }
});

//delete
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    res.status(500);
  }
});

//get a user
router.get('/find/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
