const mongoose = require('mongoose');

const FilesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true, unique: true },
    sharedBy: { type: String, required: true },
    sharedWith: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Files', FilesSchema);
