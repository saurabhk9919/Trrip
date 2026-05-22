const {
  extractTextFromPDF,
} = require("../utils/extractText");

const {
  generateItinerary,
} = require("../services/geminiService");
const Itinerary = require("../models/Itinerary");

const uploadFile = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    let extractedText = "";

    let itinerary = "";
    
    if (req.file.mimetype === "application/pdf") {
   extractedText = await extractTextFromPDF(
        req.file.path
      );
    }

    if (extractedText) {
     itinerary = await generateItinerary(
        extractedText
      );
    }

    const savedItinerary = await Itinerary.create({
      user: req.user._id,
      originalFile: req.file.filename,
      extractedText,
      itinerary,
    });
    res.status(200).json({

      message: "File uploaded and itinerary generated",

      file: {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
      extractedText,
      itinerary,
      savedItinerary,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getUserItineraries = async (req, res) => {

  try {

    const itineraries = await Itinerary.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json(itineraries);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadFile,
  getUserItineraries,
};