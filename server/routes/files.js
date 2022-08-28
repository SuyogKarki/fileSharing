const router = require('express').Router();
const Files = require('../models/Files');
const User = require('../models/User');

//send a file
router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    const newFile = new Files({ ...req.body, sharedWith: user._id });
    const savedFile = await newFile.save();
    const sender = await User.findById(req.body.sharedBy);
    const receiver = await User.findById(user._id);
    sender.sharedFiles.push(savedFile._id);
    receiver.receivedFiles.push(savedFile._id);
    await sender.save();
    await receiver.save();
    res.status(201).json(savedFile);
  } catch (err) {
    res.status(500);
  }
});

//delete a file
router.delete('/:id', async (req, res) => {
  const file = await Files.findById(req.params.id);
  if (req.body.userId === file.sharedBy) {
    try {
      const sender = await User.findById(file.sharedBy);
      const receiver = await User.findById(file.sharedWith);
      sender.sharedFiles = sender.sharedFiles.filter(id => id !== file._id);
      receiver.receivedFiles = receiver.receivedFiles.filter(id => id !== file._id);
      await sender.save();
      await receiver.save();
      await Files.findByIdAndDelete(req.params.id);
      res.status(200).json('File has been deleted');
    } catch (err) {
      res.status(500);
    }
  } else {
    res.status(403).json("You can't delete this file");
  }
});

//get files send by user
router.get('/sent/:id', async (req, res) => {
  try {
    const files = await Files.aggregate([{ $match: { sharedBy: req.params.id } }]);
    res.status(200).json(files);
  } catch (error) {
    res.status(500);
  }
});
//get files recieved by user
router.get('/recieved/:id', async (req, res) => {
  try {
    const files = await Files.aggregate([{ $match: { sharedWith: req.params.id } }]);
    res.status(200).json(files);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
