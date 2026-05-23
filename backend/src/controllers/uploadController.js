const Itinerary = require("../models/Itinerary");

const {
  extractTextFromPDF,
} = require("../utils/extractText");

const {
  generateItinerary,
} = require("../services/geminiService");


const uploadFile = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    let extractedText = "";

    let itinerary = "";


    // Extract PDF text
    if (req.file.mimetype === "application/pdf") {

      extractedText = await extractTextFromPDF(req.file.path);
    }


    // Fallback if extraction empty
    if (!extractedText || extractedText.length < 5) {

      extractedText =
        "Travel booking document uploaded successfully.";
    }


    // Generate itinerary
    itinerary = await generateItinerary(
      extractedText
    );


    // Save in DB
    const savedItinerary =
      await Itinerary.create({

        user: req.user._id,

        originalFile: req.file.filename,

        extractedText,

        itinerary,
      });


    res.status(200).json({

      message:
        "File uploaded and itinerary generated",

      extractedText,

      itinerary,

      savedItinerary,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};


const getUserItineraries = async (req, res) => {

  try {

    const itineraries =
      await Itinerary.find({

        user: req.user._id,

      }).sort({ createdAt: -1 });

    res.status(200).json(itineraries);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  uploadFile,
  getUserItineraries,
};