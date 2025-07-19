const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store your key securely
const axios = require('axios');

const generate =  async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
              text: `Given the following user input for a task title: "${prompt}", generate one relevant and concise task title suggestion based on it. Avoid special characters and punctuation unless necessary. Do not include any explanations—return only the suggestion as plain text.`
            }

            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY,
        },
      }
    );

    const result = response.data;
    res.json(result);
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate response from Gemini API' });
  }
};

module.exports = {
    generate
}