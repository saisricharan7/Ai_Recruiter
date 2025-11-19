import React from 'react'
import { useUser,type UserType } from '../../../Provider'
import { User } from 'lucide-react'

const WelcomeContainer:React.FC = () => {
    const {user} = useUser();
   
    console.log("user from welcome container",user)
  return (
    <div className='p-10'>
        <div className='p-5 bg-white  rounded-xl flex justify-between items-center'>
            <div >
                <h2 className='text-lg font-bold'>Welcome Back,{user?.name}</h2>
                <h2 className='text-gray-500'>AI-Driven Interview, Hassel-free hiring</h2>
            </div>
            {user && <img src={user?.picture} alt='userAvatar' width={50} height={50}
             className='rounded-full'></img>}
        </div>
    </div>

  )
}

export default WelcomeContainer