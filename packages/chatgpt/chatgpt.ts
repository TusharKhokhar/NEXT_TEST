import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const prompt = async (data: any) => {
  try {
    if (!configuration.apiKey) {
      return { message: 'OpenAI API key not configured, please follow instructions in README.md' };
    }
  
    const prompt = data.prompt || '';
    if (prompt.trim().length === 0) {
      return { message: "Please enter a valid prompt" };
    }
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });
    return completion;
  } catch (error) {
    return error;
  }
} 
