import { Camera,Video } from 'lucide-react'
import React,{useState} from 'react'
import { Button } from '@/components/ui/button'

const LatestInterviews:React.FC = () => {
    const [interviews, setInterviews] = useState([])
  return (
    <>
    <div className='my-5 '>
        <h2 className='font-bold text-2xl'>Previously created interviews</h2>
    </div>
    {interviews.length === 0 &&
        <div className='p-5 flex flex-col gap-3 items-center mt-10'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You don't have any interview created!</h2>
            <Button>Create New Interview</Button>
        </div>
    }
    </>
  )
}

export default LatestInterviews