const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const {
  uploadFile,
} = require("../controllers/uploadController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("document"),
  uploadFile
);

module.exports = router;