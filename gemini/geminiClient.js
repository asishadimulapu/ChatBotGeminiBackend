const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.askGemini = async (input) => {
  const model = 'gemini-2.0-flash';
  const config = { responseMimeType: 'text/plain' };
  const contents = [{ role: 'user', parts: [{ text: input }] }];

  try {
    const result = await ai.models.generateContentStream({ model, contents, config });

    let final = '';
    for await (const chunk of result) {
      final += chunk.text;
    }
    return final;
  } catch (error) {
    console.error('Gemini API Error:', error?.message || error);
    
    // Handle specific Gemini service errors
    if (error.code === 503 || error?.message?.includes('overloaded')) {
      throw new Error('Gemini is currently overloaded. Please try again later.');
    }

    // Generic fallback
    throw new Error('An error occurred while communicating with Gemini.');
  }
};
