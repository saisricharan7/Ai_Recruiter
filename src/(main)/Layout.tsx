import React from 'react'
import DashboardProvider from './DashboardProvider'
import { Outlet } from 'react-router-dom'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className='bg-secondary'>
        <DashboardProvider>
          <Outlet/>
          <div >
            {children}
          </div>
            
        </DashboardProvider>
    </div>
  )
}  

export default Layout;
