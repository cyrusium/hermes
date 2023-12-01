"use client"
import { Montserrat } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { MyLocation, PinDrop } from "@svg"
import stops_json from "../public/stops.json"

const montserrat = Montserrat({ subsets: ['latin'], preload: true, weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export default function Home() {
  const [from, setFrom] = useState<string | null | undefined>("");
  const [to, setTo] = useState<string | null | undefined>("");
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);
  const [aspect_ratio, set_aspect_ratio] = useState<string>("");
  const [stops, setStops] = useState<{ id: number, name: string }[]>([]);
  const [__stops, __setStops] = useState<string[]>([]);

  useEffect(() => {
    if (window?.screen?.height > window?.screen?.width)
      set_aspect_ratio(" h-screen")
    else set_aspect_ratio("")

    setStops(stops_json)
    __setStops(stops_json.map(stop => stop.name.toLowerCase()))
  }, [])

  const handle_from = () => {
    const value = fromRef.current?.value
    if (value && __stops.includes(value.toLowerCase()))
      setFrom(stops[__stops.indexOf(value.toLowerCase())].name)
    else setFrom("")
  }

  const handle_to = () => {
    const value = toRef.current?.value
    if (value && __stops.includes(value.toLowerCase()))
      setTo(stops[__stops.indexOf(value.toLowerCase())].name)
    else setTo("")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between pt-24 ">
      <div className="flex items-center flex-col gap-8 2xl:mt-28">
        <div className={`${montserrat.className} flex items-center flex-col gap-8 2xl:mt-28`}>
          <h1 className={`max-md:text-3xl md:text-6xl font-black text-center w-full mb-2 dark:text-white`}>
            Vá de{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-lime-500 bg-clip-text text-transparent">
              {from || "qualquer lugar"}
            </span><br />
            {" "}para{" "}
            <span className='bg-gradient-to-r from-cyan-500 to-lime-500 bg-clip-text text-transparent stroke-black stoke-2'>
              {to || "qualquer lugar"}
            </span><br />
            com Hermes
          </h1>
        </div>
        <form action="" className='flex max-md:flex-col md:flex-row md:items-center max-md:items-start max-md:mt-12 md:mt-24 dark:text-white'>
          <div className='flex fex-row'>
            <MyLocation className="p-2 fill-white" />
            <input type="search" list="stops" name="from" placeholder='Origem' className='bg-opacity-20 bg-slate-400 pr-24 pl-6 py-3 rounded-md border-none backdrop-blur-xl placeholder-slate-200 placeholder:font-extrabold font-bold' ref={fromRef} onChange={handle_from} />
          </div>
          <span className="text-4xl font-black max-md:-translate-y-5 max-md:ml-5 max-md:h-4 md:ml-3 md:-translate-y-2 select-none">.</span>
          <span className="text-4xl font-black max-md:-translate-y-5 max-md:ml-5 max-md:h-4 md:mx-2 md:-translate-y-2 select-none">.</span>
          <span className="text-4xl font-black max-md:-translate-y-5 max-md:ml-5 max-md:h-4 md:-translate-y-2 select-none">.</span>
          <div className='flex fex-row'>
            <PinDrop className="p-1 fill-white" />
            <input type="search" list="stops" name="to" placeholder='Destino' className='bg-opacity-20 bg-slate-400 pr-24 pl-6 py-3 rounded-md border-none backdrop-blur-xl placeholder-slate-200 placeholder:font-extrabold font-bold' ref={toRef} onChange={handle_to} />
          </div>
          <datalist id="stops">
            {stops.map((stop, i) => <option key={i} value={stop.name} />)}
          </datalist>
        </form>
      </div>
      <div className={`absolute top-0 left-0 w-screen -z-[999]${aspect_ratio}`}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
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
    </div>
  )
}
