const fs = require("fs");

const pdfParse = require("pdf-parse");
const extractTextFromPDF = async (filePath) => {

  try {

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
 return data.text;

  } catch (error) {
    console.log("PDF Extraction Error:", error);

    return null;
  }
};

module.exports = {
  extractTextFromPDF,
};