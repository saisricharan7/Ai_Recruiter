import React from 'react'
import { Plus } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SideBarOptions } from '../services/Constants'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import type { SideBarOption } from '@/services/Constants'

const SideBar = () => {
  const pathName = useLocation()
  const navigate = useNavigate()
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-5'>
        <img src='/logo.webp' alt='Logo'
          width={200}
          height={100}
          className='w-[150px]'/>
        <Button className='w-full mt-5' onClick={()=>navigate('/home/create-interview')}><Plus/> Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option:SideBarOption,index:number) => (
                <SidebarMenuItem key={index} className='p-1'>
                  <SidebarMenuButton asChild className={`p-5 ${pathName.pathname==option.path && 'bg-blue-100'}`}>
                    <Link to={option.path}>
                      <option.icon className={` ${pathName.pathname==option.path && 'text-primary'}`}/>
                      <span className={`text-[16px] ${pathName.pathname==option.path && 'text-primary'}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem> 
              ))}
            </SidebarMenu>
          </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default SideBar