const fs = require("fs");
const pdfParse = require("pdf-parse");


const extractTextFromPDF = async (filePath) => {

  try {

    // Read PDF buffer
    const dataBuffer = fs.readFileSync(filePath);

    // Parse PDF
    const data = await pdfParse(dataBuffer);

    // Return cleaned text
    return data.text?.trim();

  } catch (error) {

    console.error(error);

    return "";
  }
};

module.exports = {
  extractTextFromPDF,
};