import { Arrow } from '@radix-ui/react-tooltip'
import { ArrowLeft } from 'lucide-react'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from './FormContainer'
import { Progress } from '@/components/ui/progress'
import QuestionList from './QuestionList'
import InterviewLink from './InterviewLink'

interface FormContainerProps {
  jobPosition?: string
  jobDescription?: string
  interviewDuration?: string
  interviewType?: string[]
}

const CreateInterview:React.FC = () => {

    const [step,setStep] = useState<number[]>([1]);
    const [formData, setFormData] = useState<FormContainerProps>({})
    const [interviewId,setInterviewId] = useState<string>('');

    const navigate= useNavigate();
    const GoToNext=()=>{
        if(step.length>=3) return;
        setStep((prev)=>[...prev,prev[prev.length-1]+1])
    }

    const createInterviewLink = (interviewId:string) => {
        setInterviewId(interviewId);
        GoToNext();
        console.log(interviewId, step)
    }
    
  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=>navigate(-1)} className='cursor-pointer'/>
            <h2 className='font-bold text-2xl'>Create New Interview</h2>
        </div>
          <Progress value={step.length*33.33} className='my-5'/>
          {step.length==1?<FormContainer GoToNext={GoToNext} formData={formData} setFormData={setFormData}/>:
          step.length==2?<QuestionList formData={formData} createInterviewLink={createInterviewLink}/>:
          step.length==3?<InterviewLink formData={formData} interviewId={interviewId}/>:null}
    </div>
  )
}

export default CreateInterview