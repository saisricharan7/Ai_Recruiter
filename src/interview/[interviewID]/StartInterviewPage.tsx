import React, { useContext, useEffect } from 'react'
import { InterviewDataContext } from '../../context/InterviewDataContext'
import {Timer,CircleUser,Mic,Phone} from 'lucide-react'
import Vapi from '@vapi-ai/web';
import type{ CreateAssistantDTO } from "@vapi-ai/web/dist/api";


interface InterviewInfoProps{
    userName?: string,
    questionList?: Question[],
    jobPosition?: string,
    jobDescription?: string,
    duration?: string,
    type?: string,
}


interface Question {
  question: string;
  type: string;
}

interface InterviewDataContextType {
  interviewInfo: InterviewInfoProps;
  setInterviewInfo: React.Dispatch<React.SetStateAction<InterviewInfoProps>>;
}


const StartInterviewPage = () => {
    const {interviewInfo,setInterviewInfo} = useContext<InterviewDataContextType>(InterviewDataContext);

    const vapi = new Vapi(import.meta.env.VITE_PUBLIC_VAPI_KEY);
    const startCall=()=>{
        let questionList
        if(interviewInfo?.questionList){
             questionList = interviewInfo?.questionList
                ?.map((item) => item.question)
                .join(", ");
              
        }

        const assistantOptions:CreateAssistantDTO = {
            name: "AI Recruiter",
            firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.jobPosition+"?",
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                {
                    role: "system",
                    content: `
            You are an AI voice assistant conducting interviews.
            Your job is to ask candidates provided interview questions, assess their responses.
            Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
            “Hey there! Welcome to your `+interviewInfo?.jobPosition+` interview, let’s get started with a few questions!”
            Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
            Questions: `+questionList+`
            If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
            “Need a hint? Think about how React tracks component states!”
            Provide brief, encouraging feedback after each answer. Example:
            “Nice! That’s a solid answer.”
            “Hmm, not quite! Want to try again?”
            Keep the conversational natural and engaging—use casual phrases like “Alright, next up...” or “Let’s tackle a tricky one!”
            After 5-7 questions, wrap up the interview by summarizing their performance. Example:
            “That was great! You handled some tough questions well. Keep sharpening your skills!”
            End on a positive note:
            “Thanks for chatting! Hope to see you crushing projects soon!”
            Key Guidelines:
            ✅ Be friendly, engaging, and witty
            ✅ Keep responses short and natural, like a real conversation
            ✅ Adapt based on the candidate’s confidence level
            ✅ Ensure the interview remains focused on React
            `.trim(),
                },
                ],
            },
            };

        vapi.start(assistantOptions);
    }

    useEffect(()=>{
        interviewInfo && startCall()
        console.log('interviewInfo' ,interviewInfo)
    },[interviewInfo])
    return (
    <div className='p-20 lg:px-48 xl:px-5'>
        <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
           <span className='flex gap-2 items-center'>
              <Timer />

           </span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
            <div className='bg-white p-40 rounded-lg border flex justify-center items-center'>
                <CircleUser width={100} height={100}
                className='w-[60px] h-[60px] rounded-full object-'/>
                
            </div>
            <div className='bg-white h-[400px] rounded-lg border flex justify-center items-center'>
                <h2 className='flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold '>{interviewInfo?.userName?.[0]}</h2>
            </div>
            
        </div>

        <div className='flex items-center gap-5 justify-center'>
            <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full'/>
            <Phone className='h-12 w-12 p-3 bg-red-500 rounded-full'
              onClick={()=>vapi.stop()}  />
        </div>
    </div>
  )
}

export default StartInterviewPage