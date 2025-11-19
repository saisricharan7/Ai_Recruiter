import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { Question_Prompt } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { supabase } from '../../services/supabaseClient';
import { useUser } from '../../Provider'
import {v4 as uuidv4} from 'uuid'

interface FormContainerProps {
  jobPosition?: string
  jobDescription?: string
  interviewDuration?: string
  interviewType?: string[]
}

interface FormContainerComponentProps {
  formData: FormContainerProps
  createInterviewLink: (interviewId:string) => void
}


const QuestionList:React.FC<FormContainerComponentProps> = ({formData,createInterviewLink}) => {
  
  const [loading,setLoading] = useState<boolean>(true);
  const [savedLoading,setSavedLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<{ question: string; type: string }[]>([]);

  const {jobPosition,jobDescription,interviewType,interviewDuration} = formData;
  const {user} = useUser();

  const Final_Prompt = Question_Prompt
    .replace("{{jobType}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{interviewDuration}}", interviewDuration)
    .replace("{{interviewType}}", interviewType?.join(",")||"");

  const onFinish=async()=>{
    setSavedLoading(true);
    const interviewId = uuidv4();
    const { data, error } = await supabase
      .from('interview')
      .insert([
        { jobPosition: formData?.jobPosition,
          jobDescription: formData?.jobDescription,
          duration: formData?.interviewDuration,
          type: formData?.interviewType,
          questionList: questions,
          userEmail:user?.email,
          interview_id:interviewId
        },
      ]).select()
    if(error){
      console.log(error)
      toast('Error saving interview. Please try again.')
      setSavedLoading(false);
    }
    if(data){
      console.log("finished",data)
      toast('Interview saved successfully!',{
        className: "bg-green-500 text-white",
        })
      setSavedLoading(false);
      createInterviewLink(interviewId);
    }
    console.log("data",data)
    setSavedLoading(false);
  }
  
  const GenerateQuestionList=async()=>{
    
    setLoading(true);
    try{
      const result =await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'x-ai/grok-4-fast:free',
          messages: [
            {
              role: 'user',
              content: Final_Prompt,
            },
          ],
          Response_format: 'json',
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log("if success",response.data.choices[0].message);
        const rawContent = response.data.choices[0].message.content || '';
        const parsedContent = JSON.parse(rawContent);
        console.log("parsed",parsedContent);
        setQuestions(parsedContent);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      setLoading(false);
      console.log(questions)
    }catch(e){
      toast('server error try again')
      setLoading(false);
    }
      
  }

  
  useEffect(()=>{
    console.log(Final_Prompt)
    if(formData.jobPosition && formData.jobDescription && formData.interviewDuration && formData.interviewType){
      console.log('hello')
      GenerateQuestionList();
    }
    console.log("question state",questions)
  },[formData]) 

  return (
    <div>
      {loading && 
        <div className='p-5 bg-blue-50 rounded-xl border border-primary items-center flex gap-5'>
          <Loader2Icon className='animate-spin h-6 w-6 text-blue-500'/>
          <div>
            <h2 className='font-bold text-2xl'>Generating Questions...</h2>
            <p className='text-primary '>Our AI is crafting personalized questions based on your job position</p>
          </div> 
        </div>
      }
      {questions?.length>0 && !loading &&
        <div className='p-5 border bg-white border-gray-300 rounded-xl'>
          <h2 className='font-bold text-2xl mb-5'>Suggested Questions</h2>
          {questions.map((item, index)=>(
            <div key={index} className='p-3 mb-3 border border-gray-200 rounded-xl'>
              <h2 className='font-medium'>{item.question}</h2>
              <h2 className='text-sm text-gray-500'>Type: {item?.type}</h2>
            </div>
          )
          )}

        </div>
      }
      {!loading &&
        <div className="flex justify-end mt-10">
          <Button onClick={()=>onFinish()} >
            {savedLoading?'Saving...':'Finish & Save Interview'}
          </Button>
        </div>
      }
     
    </div>
  )
}

export default QuestionList