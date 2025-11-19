import { useState } from 'react'
import Login from './auth/Login'
import Provider from './Provider'
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import DashboardProvider from './(main)/DashboardProvider';
import Layout from './(main)/Layout';
import Dashboard from './(main)/dashboard/Dashboard';
import CreateInterview from './(main)/Create-interview/CreateInterview';
import { Toaster } from "@/components/ui/sonner"
import InterviewLayout from './interview/InterviewLayout';
import StartInterviewPage from './interview/[interviewID]/StartInterviewPage';
import InterviewPage from './interview/[interviewID]/InterviewPage';

function App() {


  return (
    <Provider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          {/* <Route path='/checkUsers' element={<Provider/>}/> */}
          <Route path='/home' element={<Layout/>}>
            <Route path='/home/dashboard' element={<Dashboard/>}/>
            <Route path='/home/create-interview' element={<CreateInterview/>}/>
            
          </Route>
          {/* <Route path='/interview/:interviewId/' element={<InterviewLayout/>}/>
          <Route path='/interview/:interviewId/start' element={<StartInterviewPage/>}/> */}
        <Route path="/interview/:interviewId" element={<InterviewLayout />}>
          <Route index element={<InterviewPage />} />
          <Route path="start" element={<StartInterviewPage />} />
        </Route>
          
        </Routes>
      </BrowserRouter>
    
    </Provider>
  )
}

export default App
