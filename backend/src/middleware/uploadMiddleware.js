const multer = require("multer");
const path = require("path");


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
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF, PNG, JPG, JPEG files are allowed"
      ),
      false
    );
  }
};
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;