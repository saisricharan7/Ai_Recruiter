import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft,Copy,Clock,Mail,Plus, MessageCircleMore, MessageSquareText, } from 'lucide-react'
import { toast } from 'sonner'

type InterviewLinkProps = {
  formData: {
    jobPosition?: string,
    jobDescription?: string,
    interviewDuration?: string,
    interviewType?: string[]
  },
  interviewId: string
}



const InterviewLink:React.FC<InterviewLinkProps> = ({formData,interviewId}) => {
  
  const url = import.meta.env.VITE_PUBLIC_HOST_URL + `/${interviewId}`;

  const GetInterviewUrl= ():string => {
    return url;
  }

  const onCopyLink = async() => {
  await navigator.clipboard.writeText(url)
  toast('Link copied to clipboard!' )
  }
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <img src='/check.png' width={200} height={200} className='w-[150px] h-[150px]'/>
      <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
      <p className='mt-3'>Share this link with your candidates to start the interview</p>
      <div className='w-full p-7 mt-6 rounded-xl bg-white'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold'>Interview Link</h2>
          <h2 className='p-1 px-2 text-primary bg-blue-50 tounded'>Valid for 30 days</h2>
             
        </div>
        <div className='mt-3 flex gap-3 items-center'>
            <Input defaultValue={GetInterviewUrl()} disabled={true}/>
            <Button onClick={()=>onCopyLink()}><Copy>Copy Link</Copy></Button>
        </div>  
        <hr className='my-7'></hr>  
        <div className='flex gap-5'>
          <h2 className='text-sm text-gray-500 flex gep-2 items-center'><Clock className='h-4 w-4'/>{formData.interviewDuration}</h2>
          {/* <h2 className='text-sm text-gray-500 flex gep-2 items-center'><Clock className='h-4 w-4'/>30 Min</h2> */}
          {/* <h2 className='text-sm text-gray-500 flex gep-2 items-center'><Clock className='h-4 w-4'/>30 Min</h2> */}

        </div>
      </div>
      <div className='mt-7 bg-white p-5 rounded-lg w-full'>
        <h2 className='font-bold'>Share Via</h2>
        <div className='mt-2 flex gap-7'>
          <Button variant={'outline'} ><Mail></Mail>Email</Button>
          <Button variant={'outline'} ><MessageSquareText/>Slack</Button>
          <Button variant={'outline'} ><MessageCircleMore/>Watsapp</Button>
        </div>
      </div>
      <div className='w-full flex gap-5 justify-between mt-6 my-5'>
        <Link to='/home/dashboard'>
          <Button variant={'outline'}><ArrowLeft/> Back to Dashboard</Button>
        </Link>

        <Link to='/home/create-interview'>
          <Button><Plus/>Create Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default InterviewLink