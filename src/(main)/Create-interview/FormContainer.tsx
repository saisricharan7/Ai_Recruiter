import React,{useEffect, useState} from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { InterviewTypes,type InterviewType } from '@/services/InterviewType'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'


interface FormContainerProps {
    'jobPosition'?: string;
    'jobDescription'?: string;
    'interviewDuration'?: string;
    'interviewType'?: string[];
}

interface FormContainerComponentProps {
  GoToNext: () => void;
  formData: FormContainerProps
  setFormData: React.Dispatch<React.SetStateAction<FormContainerProps>>
}

const FormContainer:React.FC<FormContainerComponentProps> = ({
    GoToNext,
    formData,
    setFormData
}) => {
    
    const [interviewType,setInterviewType] = useState<string[]>([])

    const onHandleInputChange=(field:string,value:string)=>{
        setFormData(prev=>({...prev,[field]:value}))
       
    }

    const AddInterviewType=(type:string)=>{
        const data = interviewType.includes(type);
        if(!data){
            setInterviewType((prev)=>[...prev,type])
        }else{
            const res= interviewType.filter(item=>item!==type)
            setInterviewType(res)
        }
    }

    const handleNext = () => {
    if (
      !formData.jobPosition ||
      !formData.jobDescription ||
      !formData.interviewDuration ||
      !formData.interviewType ||
      formData.interviewType.length === 0
    ) {
      toast.error("Please fill in all fields!");
      return;
    }
    GoToNext();
  };

    useEffect(()=>{
        if(interviewType.length>0){
           onHandleInputChange('interviewType',interviewType)
        }
    },[interviewType])

  return (
    <>
    
    <div className='p-5 bg-white'>
        <div>
            <h2 className='text-sm'>Job Position</h2>
            <Input placeholder='e.g Fullstack Developer' className='mt-2'
                onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm '>Job Description</h2>
            <Textarea placeholder='Describe the job position' className='mt-2 h-[200px]'
                onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm '>Interview Duration</h2>
            <Select onValueChange={(value)=>onHandleInputChange('interviewDuration',value)}>
                <SelectTrigger className="w-full mt-2 ">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5 Min">5 Min</SelectItem>
                    <SelectItem value="15 Min">15 Min</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                </SelectContent>
            </Select>

        </div>
        <div className='mt-5 '>
            <h2 className='text-sm'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2'>
            {InterviewTypes.map((type:InterviewType,index:number)=>(
                <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white border
                     border-gray-300 rounded-2xl
                     hover:bg-secondary ${interviewType.includes(type.title)&&'bg-blue-200 text-primary'}`}
                     onClick={()=>{AddInterviewType(type.title)}}>
                    <type.icon className='h-4 w-4'/>
                    <span>{type.title}</span>
                </div>
            ))}
            </div>
        </div>
        <div className='mt-7 flex justify-end'>
            <Button onClick={handleNext}>Generate Question<ArrowRight/></Button>
        </div>
        
    </div>
    </>
  )
}

export default FormContainer