const uploadFile = async (req, res) => {

  try {

    // Check file exists
    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Success response
    res.status(200).json({

      message: "File uploaded successfully",

      file: {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadFile,
};