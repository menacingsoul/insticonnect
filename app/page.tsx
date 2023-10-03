import Link from 'next/link'
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-zinc-600/60 via-black to-zinc-600/40">
    <div className="text-center">
    <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
				Insticonnect.
			</h1>
      <div className=' flex items-center justify-center gap-6 my-6 animate-fade-in'>
      <Link href="/login">
        <div className="text-lime-500  sm:text-xl md:text-2xl duration-500 p-4 bg-sky-400">Login</div>
      </Link>
      <Link href="/register">
        <div className="text-lime-500  sm:text-xl md:text-2xl duration-500 bg-sky-400">Register</div>
      </Link>
      </div>
    </div>
  </div>
  )
}
