import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateMealPlanWithAI = async (prompt: string) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',

        messages: [
          { role: 'system', content: 'You are a helpful meal planner.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        }
      }
    );

    const aiMessage = response.data.choices[0]?.message?.content;
    return aiMessage || 'No meal plan generated.';
  } catch (error: any) {
    console.error('❌ Error in AI Call:', error.response?.data || error.message);
    throw new Error('Failed to generate meal plan.');
  }
};
