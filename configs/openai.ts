import OpenAI from 'openai';

const openai = new (OpenAI as any)({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;