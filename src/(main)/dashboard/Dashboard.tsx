import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviews from './_components/LatestInterviews'

const Dashboard = () => {
  return (
    <>
    {/* <WelcomeContainer/> */}
    <div className='my-3 font-bold text-2xl'>Dashboard</div>
    <CreateOptions/>
    <LatestInterviews/>
    </>
  )
}

export default Dashboard