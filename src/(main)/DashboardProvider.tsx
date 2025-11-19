import SideBar from '@/_components/SideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'

import React from 'react'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

type DashboardProviderProps = {
  children: React.ReactNode
}

const DashboardProvider:React.FC<DashboardProviderProps> = ({children}) => {
  return (
    <SidebarProvider>
        <SideBar />
        <div className='w-full'>
          <SidebarTrigger />
          <WelcomeContainer/>
          {children}
        </div>
    </SidebarProvider>
    
  )
}

export default DashboardProvider