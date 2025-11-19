import React, {useState, useEffect,useContext,createContext  } from 'react'
import type{ReactNode} from 'react'
import { supabase } from './services/supabaseClient';



interface ProviderProps {
  children: ReactNode
}

export interface UserType {
  email?: string;
  name?: string;
  picture?: string;
}

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export const UserDetailContext = createContext<UserContextType|null>(null)

const Provider:React.FC<ProviderProps>  = ({children}) => {
    useEffect(() => {
       CreateNewUser()

    }, [])
    const [user,setUser]=useState<UserType|null>(null)
    const CreateNewUser=async() => {
        supabase.auth.getUser().then(async({data:{user}})=>{
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email',user?.email)
            
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
            }else if(Users){
                console.log("User already exists")
                setUser(Users[0])
                return
            }
            if(error){
                console.log(error)
            }
        })
    }
  return (
    <UserDetailContext.Provider value={{user,setUser}}>
    <div>
        
        {children}
    </div>
    </UserDetailContext.Provider>
  )
}



export const useUser= ():UserContextType =>{
    const context = useContext(UserDetailContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
}

export default Provider