import OpenAI from 'openai';
 const ai = OpenAI(
    api_key=process.env,GEMINI_API_KEY,
    base_url=process.env.GEMINI_BASE_URL
)

export default ai