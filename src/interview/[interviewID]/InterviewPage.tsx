import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Clock,Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { InterviewDataContext } from '@/context/InterviewDataContext';

interface FormContainerProps {
  jobPosition?: string
  jobDescription?: string
  duration?: string
  type?: string
}

interface Question {
  question: string;
  type: string;
}

interface InterviewInfoProps{
    userName?: string,
    questionList?: Question[],
    jobPosition?: string,
    jobDescription?: string,
    duration?: string,
    type?: string,
}

interface InterviewDataContextType {
  interviewInfo: InterviewInfoProps;
  setInterviewInfo: React.Dispatch<React.SetStateAction<InterviewInfoProps>>;
}

const InterviewPage = () => {
    const {interviewId} = useParams();
    const [userName,setUserName] = useState<string>('');
    const [interviewDetails,setInterviewDetails] = useState<FormContainerProps>()
    const {interviewInfo,setInterviewInfo} = useContext<InterviewDataContextType>(InterviewDataContext);
    const navigate = useNavigate();

    const GetInterviewDetails = async () => {
        try{
            let {data : Interviews,error} = await supabase
            .from('interview')
            .select('jobPosition,jobDescription,duration,type')
            .eq('interview_id',interviewId)
            if(Interviews?.length===0){
                toast('incorrect interview link')
                return;
            }
            const arr= JSON.parse(Interviews?.[0]?.type)
            setInterviewDetails({jobPosition:Interviews?.[0]?.jobPosition.toUpperCase(),
            jobDescription:Interviews?.[0]?.jobDescription,
            duration:Interviews?.[0]?.duration,
            type:arr[0]})
        }catch(err){
            console.log(err)
            toast('incorrect interview link')
        }

        
    }

    const onJoinInterview = async() => {
        try{
            const {data:Interviews,error} = await supabase
            .from('interview')
            .select('*')
            .eq('interview_id',interviewId)
            if(Interviews?.length===0){
                toast('incorrect interview link')
                return;
            }
            const arr= JSON.parse(Interviews?.[0]?.type)
            setInterviewInfo({userName:userName,
            questionList:Interviews?.[0]?.questionList,
            jobPosition:Interviews?.[0]?.jobPosition.toUpperCase(),
            jobDescription:Interviews?.[0]?.jobDescription,
            duration:Interviews?.[0]?.duration,
            type:arr[0]})
            navigate(`/interview/${interviewId}/start`)   
        }catch(err){
            console.log(err)
            toast('Error joining interview. Please try again.')
        }


       
    }

    useEffect(()=>{
        interviewId && GetInterviewDetails();
        console.log('interview details',interviewDetails)
    },[interviewId])


  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
         <div className='flex flex-col items-center justify-center border
            p-7 rounded-lg bg-white lg:px-32 xl:px-52'>
            <img src='/logo.webp' alt='logo' width={200} height={100}
                className='w-[140px]' />
            <h2 className='mt-3'>AI-powered Interview Platform</h2>
            <img src='/interview_page.png' alt='interview' 
                width={500}
                height={500}
                className='w-[280px] my-6'></img>
            <h2 className='font-bold text-xl '>{interviewDetails?.jobPosition}</h2>
            <h2 className='text-gray-500 mt-3 flex gap-1'><Clock/>{interviewDetails?.duration}</h2>
            <div className='w-full mt-6'>   
                <h2>Enter your full name</h2>
                <Input placeholder='e.g. John Smith'
                    onChange={(e)=>setUserName(e.target.value)}/>
            </div>

            <Button className={'mt-5 w-full font-bold'}
                disabled={userName.length===0}
                onClick={()=>{onJoinInterview()}}>
            <Video/> Join Interview
            </Button>
            
         </div>
    </div>
  )
}

export default InterviewPage