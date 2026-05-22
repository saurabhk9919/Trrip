const {
  extractTextFromPDF,
} = require("../utils/extractText");


const uploadFile = async (req, res) => {

  try {


    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {

      extractedText = await extractTextFromPDF(
        req.file.path
      );
    }

    res.status(200).json({

      message: "File uploaded successfully",

      file: {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },

      extractedText,
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