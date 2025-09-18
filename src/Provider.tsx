import React, {  useEffect } from 'react'
import type{ReactNode} from 'react'
import { supabase } from './services/supabaseClient';

interface ProviderProps {
  children: ReactNode
}

const Provider:React.FC<ProviderProps>  = ({children}) => {
    useEffect(() => {
        CreateNewUser()
    }, [])
    const [user,setUser]=React.useState<any>(null)
    const CreateNewUser=async() => {
        supabase.auth.getUser().then(async({data:{user}})=>{
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email',user?.email)
            console.log(Users)
            if(Users?.length===0){
                const {data,error}= await supabase.from('Users').insert([
                    { email: user?.email, name: user?.user_metadata.full_name, picture: user?.user_metadata.avatar_url }
                ])
                console.log("New User Created")
                console.log(data)
                if(data){
                    setUser(data[0])
                }else{
                    console.log(`User insertion error:${error}`)
                }
                
                return
            }
            if(error){
                console.log(error)
            }
        })
    }
  return (
    <div>
        <h1>Checking Users</h1>
        {children}
    </div>
  )
}

export default Provider