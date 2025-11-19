import { OpenAI } from 'openai';
import { Question_Prompt } from '../../services/Constants';

export async function POST(request: Request) {

    const {jobPosition,jobDescription,interviewType,interviewDuration} = await request.json();
    const Final_Prompt = Question_Prompt
    .replace("{{jobType}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{interviewDuration}}", interviewDuration)
    .replace("{{interviewType}}", interviewType?.join(",")||"");
  try{
      const openai = new OpenAI({
          baseURL: 'https://openrouter.ai/api/v1',
          apiKey: process.env.VITE_PUBLIC_OPENROUTER_API_KEY,
          
      });

      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [
          {
            role: 'user',
            content: Final_Prompt,
          },
        ],
        });
      console.log("apians",completion.choices[0].message);
      return new Response(
      JSON.stringify({ questions: completion.choices[0].message }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
)
      
    }catch(error){
      console.log("Error generating questions:", error);
    }

}