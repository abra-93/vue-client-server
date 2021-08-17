const fs = require("fs");
const multer = require("multer");
const upload = multer();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `post-images/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  filter: function (mimeType) {
    if (mimeType === "image/png") {
      return ".png";
    } else if (mimeType === "image/jpg") {
      return ".jpg";
    } else if (mimeType === "image/gif") {
      return ".gif";
    } else {
      return ".jpeg";
    }
  },
});

module.exports = multer({
  storage,
});
