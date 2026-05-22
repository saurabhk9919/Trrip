const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);
const generateItinerary = async (travelText) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
    You are an AI travel planner.
    Based on the following travel booking details,
    generate a professional structured travel itinerary.

    Include:
    - Destination
    - Travel Dates
    - Flight Details
    - Hotel Details
    - Day-wise plan
    - Important notes
    - Travel tips

    Booking Details:
    ${travelText}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;

  } catch (error) {

    console.log("Gemini Error:", error);

    return "Failed to generate itinerary";
  }
};

module.exports = {
  generateItinerary,
};