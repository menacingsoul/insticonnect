'use client'
import React, { useState } from 'react';
import useApi from '@/utils/useApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, fetchData } = useApi();
  

  const handleLogin = async () => {
    const loginData = { email, password };

    // Send a POST request to the login endpoint
    await fetchData('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    // Check if login was successful and handle errors
    if (!error) {
      router.push('/home');
    } else {
      console.log('error logging in');
    }
  };

  return (
    <div className=' font-poppins h-screen w-screen bg-gradient-to-tl from-gray-600/70 via-stone to-gray-600/4'>
       <h2 className='text-center p-8 text-3xl font-bold'>Login</h2>
       <div className=' flex flex-col items-center justify-center w-5/12 h-2/4 overflow-hidden rounded-xl bg-gradient-to-tl from-zinc-600/60 via-black to-zinc-600/40 mx-auto my-16 shadow-lg'>
       <h2 className='text-center text-stone-300 text-2xl mb-5 font-bold'>Insticonnect<span className=' font-poppins font-extrabold text-lime-500'>.</span></h2>
        <div className='p-6 flex flex-col gap-5 w-96'>
           <input className='p-2 rounded-md' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <input className='p-2 rounded-md' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
       </div>
        <p className='text-white p-3'>New user?{' '} <Link href="/pages/register" > <span className=' text-sky-600'>Register</span></Link></p>
           <button  onClick={handleLogin} className=' bg-lime-400 p-2 px-4 rounded-lg'>Login</button>
       </div>
    </div>
  );
};
export default Login;