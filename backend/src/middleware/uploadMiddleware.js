const multer = require("multer");


// Storage Configuration
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "src/uploads/");
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});


// Upload Middleware
const upload = multer({
  storage,
});

module.exports = upload;