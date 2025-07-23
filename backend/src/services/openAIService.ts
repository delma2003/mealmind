import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Put this in your .env
});

export async function getAIResponse(prompt: string): Promise<string> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-70b-8192", // or use mistral-7b, llama3-8b, etc.
  });

  return chatCompletion.choices[0].message.content || "";
}
