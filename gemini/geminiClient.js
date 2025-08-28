const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Enhanced system prompt for better AI responses
const SYSTEM_PROMPT = `You are a helpful, intelligent, and friendly AI assistant. Your responses should be:
- Accurate and informative
- Well-structured with proper formatting when needed
- Engaging and conversational
- Safe and appropriate
- Concise but comprehensive when necessary

When answering:
- Use markdown formatting for better readability
- Break down complex topics into digestible parts
- Provide examples when helpful
- Ask clarifying questions if the user's request is unclear
- Be creative and thoughtful in your responses

If asked about coding, provide clean, well-commented code examples.
If asked about explanations, use analogies and examples to make concepts clear.
Always maintain a helpful and professional tone.`;

exports.askGemini = async (input) => {
  const model = 'gemini-2.0-flash';
  const config = { 
    responseMimeType: 'text/plain',
    temperature: 0.7, // Add some creativity
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048, // Limit response length
  };

  // Enhanced prompt with system instructions
  const enhancedPrompt = `${SYSTEM_PROMPT}\n\nUser: ${input}\n\nAssistant:`;

  const contents = [{ 
    role: 'user', 
    parts: [{ text: enhancedPrompt }] 
  }];

  try {
    const result = await ai.models.generateContentStream({ 
      model, 
      contents, 
      config 
    });

    let final = '';
    let chunkCount = 0;
    const maxChunks = 100; // Prevent infinite loops

    for await (const chunk of result) {
      if (chunkCount >= maxChunks) {
        console.warn('Response truncated: Maximum chunks reached');
        break;
      }
      
      if (chunk.text) {
        final += chunk.text;
        chunkCount++;
      }
    }

    // Clean up the response
    final = final.trim();
    
    if (!final) {
      throw new Error('Empty response received from Gemini');
    }

    // Remove the system prompt echo if it appears in response
    if (final.startsWith('Assistant:')) {
      final = final.replace('Assistant:', '').trim();
    }

    return final;

  } catch (error) {
    console.error('Gemini API Error:', {
      message: error?.message || 'Unknown error',
      code: error?.code || 'N/A',
      status: error?.status || 'N/A'
    });
    
    // Handle specific Gemini service errors
    if (error.code === 503 || error?.message?.includes('overloaded')) {
      throw new Error('🤖 I\'m experiencing high traffic right now. Please try again in a moment!');
    }

    if (error.code === 429 || error?.message?.includes('quota')) {
      throw new Error('🚫 API quota exceeded. Please try again later.');
    }

    if (error.code === 400 || error?.message?.includes('invalid')) {
      throw new Error('❌ Invalid request. Please rephrase your question.');
    }

    if (error?.message?.includes('safety')) {
      throw new Error('⚠️ Your message was flagged by safety filters. Please try rephrasing.');
    }

    if (error?.message?.includes('network') || error?.message?.includes('timeout')) {
      throw new Error('🌐 Network connection issue. Please check your internet and try again.');
    }

    // Generic fallback with helpful message
    throw new Error('🤔 I\'m having trouble processing your request right now. Please try again or rephrase your question.');
  }
};

// Helper function to validate input
exports.validateInput = (input) => {
  if (!input || typeof input !== 'string') {
    throw new Error('Input must be a non-empty string');
  }

  if (input.length > 1000) {
    throw new Error('Input too long. Please limit to 1000 characters.');
  }

  if (input.trim().length === 0) {
    throw new Error('Input cannot be empty or only whitespace');
  }

  return input.trim();
};
