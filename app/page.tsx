import Link from 'next/link';
import { AuthProvider } from '@/utils/authContext';
export default function Home() {
  return (
   
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-zinc-600/60 via-black to-zinc-600/40">
      <div className="text-center">
        <h1 className="z-10 text-4xl text-transparent font-poppins duration-1000 bg-white cursor-default text-edge-outline font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text animate-typing">
          Insticonnect<span className=' font-poppins font-extrabold text-lime-500'>.</span>
        </h1>
        <div className='flex flex-row items-center justify-center gap-6 my-16 animate-fade-in'>
          <Link href="/pages/login">
            <div className="text-lime-500 font-poppins sm:text-lg md:text-2xl duration-500 p-2 w-28 rounded-md bg-sky-400/20">Login</div>
          </Link>
          <Link href="/pages/register">
            <div className="text-lime-500 font-poppins sm:text-lg md:text-2xl duration-500 p-2 w-28 rounded-md bg-sky-400/20">Register</div>
          </Link>
        </div>
      </div>
    </div>
  
  );
}
