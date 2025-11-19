import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import InterviewHeader from './_components/InterviewHeader'
import InterviewPage from './[interviewID]/InterviewPage'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import StartInterviewPage from './[interviewID]/StartInterviewPage'

type LayoutProps = {
  children: React.ReactNode
}

interface Question {
  question: string;
  type: string;
}

interface FormContainerProps {
    userName?: string,
    questionList?: Question[],
    jobPosition?: string,
    jobDescription?: string,
    duration?: string,
    type?: string,
}


const InterviewLayout:React.FC<LayoutProps> = ({children}) => {
  
    const[interviewInfo,setInterviewInfo] =useState<FormContainerProps>({})  
    console.log("interviewInfo from layout",interviewInfo) 
    return (
    <InterviewDataContext.Provider value={{interviewInfo,setInterviewInfo}}>
    <div>
        <InterviewHeader/>

        {/* <InterviewPage/> */}
        <Outlet/> 
        {/* <Routes>
        <Route index element={<InterviewPage />} /> 
        <Route path="/interview/:interviewId/start" element={<StartInterviewPage />} /> 
      </Routes> */}
        {children}
    </div>
    </InterviewDataContext.Provider>
   )
}

export default InterviewLayout