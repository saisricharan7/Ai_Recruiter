import React from 'react';
import {Button} from '../components/ui/button';
import { supabase } from '../services/supabaseClient';

const Login= () => {

    const signInWithGoogle = async () => {
        // Implement Google Sign-In logic here
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        
        if (error) {
            console.error('Error during sign-in:', error.message);
        }else{
            window.location.href='/checkUsers'
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='flex flex-col items-center border p-8 rounded-2xl'>
                <img src='/logo.webp' alt='Logo' 
                    width={400}
                    height={100}
                    className='w-[180px]'/>
                <div className='flex flex-col items-center justify-center'>
                    <img src='/login.webp' alt='Login_png'
                        width={600}
                        height={400}
                        className='w-[400px] h-[250px] rounded-2xl'
                    />
                    <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AICruiter</h2>
                    <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
                    <Button className='mt-5 w-full cursor-pointer'
                     onClick={signInWithGoogle}>
                        LogIn With Google</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;