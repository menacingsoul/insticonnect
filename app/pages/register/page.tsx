'use client'
import React, { useState } from 'react';
import useApi from '@/utils/useApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState(''); // State to hold error message
  const { loading, error, fetchData } = useApi();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorText("Passwords do not match.");
      return;
    }

    const registerData = { username, email, password };

    // Send a POST request to the registration endpoint
    await fetchData('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    // Check if registration was successful and handle errors
    if (!error) {
      // Redirect or perform other actions on successful registration
      console.log('Successfully registered');
      router.push('/home');
    } else {
      // Handle registration error and display an error message
      setErrorText("Registration failed. Please try again.");
    }
  };

  return (
    <div className='font-poppins h-screen w-screen bg-gradient-to-tl from-gray-600/70 via-stone to-gray-600/4'>
      <h2 className='text-center p-8 text-3xl font-bold'>Register</h2>
      <div className='flex flex-col items-center justify-center md:w-5/12 h-3/4 sm:w-9/12 overflow-hidden rounded-xl bg-gradient-to-tl from-zinc-600/60 via-black to-zinc-600/40 mx-auto my-16 shadow-lg'>
      <h2 className='text-center text-stone-300 text-2xl mb-5 font-bold'>Insticonnect<span className=' font-poppins font-extrabold text-lime-500'>.</span></h2>
        <div className='p-6 flex flex-col gap-5 w-96'>
          <input
            className='p-3 rounded-md'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='p-3 rounded-md'
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='p-3 rounded-md'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className='p-3 rounded-md'
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorText && <p className="text-red-500">{errorText}</p>}
        </div>
        <p className='text-white p-3'>
          Already have an account?{' '}
          <Link href="/pages/login">
            <span className='text-sky-600'>Login</span>
          </Link>
        </p>
        <button onClick={handleRegister} className='bg-lime-400 p-2 px-4 rounded-lg'>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
