const Groq = require("groq-sdk");

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY || process.env.groq_api_key;

  if (!apiKey) {
    return null;
  }

  return new Groq({
    apiKey,
  });
};

const generateItinerary = async (travelText) => {
  try {
    const groq = getGroqClient();

    if (!groq) {
      return "Groq API key is missing. Unable to generate itinerary.";
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            You are an AI travel planner.
            Generate a professional travel itinerary
            based on travel booking details.
          `,
        },
        {
          role: "user",
          content: `
            Generate a complete travel itinerary
            from this booking information:

            ${travelText}

            Include:
            - destination
            - travel dates
            - flight details
            - hotel details
            - day-wise itinerary
            - travel tips
          `,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("Groq AI Error:");
    console.error(error);

    return "Failed to generate itinerary";
  }
};

module.exports = {
  generateItinerary,
};