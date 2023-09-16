"use client"
import { Montserrat } from 'next/font/google'
import { useRef, useState } from 'react'
import { MyLocation, PinDrop } from "@svg"

const montserrat = Montserrat({ subsets: ['latin'], preload: true, weight: ["900"] })
const mask = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)'
const header_mask = {
  'mask-image': mask,
  '-webkit-mask-image': mask,
}

export default function Home() {
  const [from, setFrom] = useState<string | null | undefined>("");
  const [to, setTo] = useState<string | null | undefined>("");
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='overflow-hidden h-screen w-screen'>
      <header className='sticky top-0 w-screen px-20 pt-8 inline-flex select-none items-center justify-between'>
        <div className='absolute top-0 left-0 w-full h-[175%] backdrop-blur-lg -z-10' style={header_mask as any} />
        <div className='flex flex-row items-center'>
          <span className={`${montserrat.className} font-extrabold text-4xl`}>Hermes</span>
          <span className='text-sm font-bold translate-y-0.5 px-2 p-0.5 rounded-xl ml-3 bg-fuchsia-600'>ALPHA</span>
        </div>
        <div className='inline-flex justify-evenly w-full'>
          <span className='font-black text-slate-300'>Search</span>
        </div>
        <div><span className='font-black text-slate-300'>Login</span></div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between pt-24 ">
        <div className="flex items-center flex-col gap-8 mt-28 overflow-hidden">
          <h1 className={`text-6xl font-black ${montserrat.className} text-center w-full`}>
            Vá de{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-lime-500 bg-clip-text text-transparent">
              {from || "qualquer lugar"}
            </span><br />
            {" "}para{" "}
            <span className='bg-gradient-to-r from-cyan-500 to-lime-500 bg-clip-text text-transparent stroke-black stoke-2'>
              {to || "qualquer lugar"}
            </span>
          </h1>
          <h2 className={`text-[2.5rem] font-extrabold ${montserrat.className}`}>do jeito mais rápido possível</h2>
          <form action="" className='flex flex-row items-center mt-24'>
            <MyLocation className="p-2 fill-white" />
            <input type="text" name="from" placeholder='Origem' className='bg-opacity-20 bg-slate-400 pr-24 pl-6 py-3 rounded-md border-none backdrop-blur-xl text-white placeholder-slate-200 placeholder:font-extrabold font-bold' ref={fromRef} onChange={() => setFrom(fromRef.current?.value)} />
            <span className="text-4xl font-black ml-3 -translate-y-2 select-none">.</span>
            <span className="text-4xl font-black mx-2 -translate-y-2 select-none">.</span>
            <span className="text-4xl font-black -translate-y-2 select-none">.</span>
            <PinDrop className="p-1 -m-1 fill-white" />
            <input type="text" name="to" placeholder='Destino' className='bg-opacity-20 bg-slate-400 pr-24 pl-6 py-3 rounded-md border-none backdrop-blur-xl text-white placeholder-slate-200 placeholder:font-extrabold font-bold' ref={toRef} onChange={() => setTo(toRef.current?.value)} />
          </form>
        </div>
        <div className="absolute top-0 left-0 w-screen h-screen -z-[999] overflow-hidden">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
                <animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#69D932" />
                <stop offset="100%" stopColor="#69D93200" />
              </radialGradient>
              <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
                <animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#0B1EE0" />
                <stop offset="100%" stopColor="#0B1EE000" />
              </radialGradient>
              <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
                <animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#0047CA" />
                <stop offset="100%" stopColor="#0047CA00" />
              </radialGradient>
              <radialGradient id="Gradient4" cx="50%" cy="50%" fx="4.56417%" fy="50%" r=".5">
                <animate attributeName="fx" dur="23s" values="0%;5%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#34E337" />
                <stop offset="100%" stopColor="#34E33700" />
              </radialGradient>
              <radialGradient id="Gradient5" cx="50%" cy="50%" fx="2.65405%" fy="50%" r=".5">
                <animate attributeName="fx" dur="24.5s" values="0%;5%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#0BBDD6" />
                <stop offset="100%" stopColor="#0BBDD600" />
              </radialGradient>
              <radialGradient id="Gradient6" cx="50%" cy="50%" fx="0.981338%" fy="50%" r=".5">
                <animate attributeName="fx" dur="25.5s" values="0%;5%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#32D9C2" />
                <stop offset="100%" stopColor="#32D9C200" />
              </radialGradient>
            </defs>
            <rect x="13.744%" y="1.18473%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(334.41 50 50)">
              <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" />
              <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="7s" repeatCount="indefinite" />
            </rect>
            <rect x="-2.17916%" y="35.4267%" width="100%" height="100%" fill="url(#Gradient2)" transform="rotate(255.072 50 50)">
              <animate attributeName="x" dur="23s" values="-25%;0%;-25%" repeatCount="indefinite" />
              <animate attributeName="y" dur="24s" values="0%;50%;0%" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite" />
            </rect>
            <rect x="9.00483%" y="14.5733%" width="100%" height="100%" fill="url(#Gradient3)" transform="rotate(139.903 50 50)">
              <animate attributeName="x" dur="25s" values="0%;25%;0%" repeatCount="indefinite" />
              <animate attributeName="y" dur="12s" values="0%;25%;0%" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="9s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </main >
    </div>
  )
}
