"use client"
import { useLayoutEffect, useRef, useState } from "react"

import { Exit } from "@svg";
import { useParams, useRouter } from "next/navigation"

import { type RouteInfo, type TabProps, TAB } from "@util/types";
import { route_info_mock } from "@mock"
import RouteDisplay from "@components/routeinfo"

export default function Slug() {
  const router = useRouter();
  const params = useParams();
  const mainDiv = useRef<HTMLDivElement>(null as unknown as any);
  ; const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)

  useLayoutEffect(() => {
    setRouteInfo(route_info_mock.find(route => route.id === params.slug) ?? null);
  }, [params.slug]);

  const exit = () => {
    setTimeout(() => router.back(), 200);
    mainDiv.current.classList.add("animate-[exit_.25s_cubic-bezier(0,0,0.2,1)_1]");
  }

  return <div className="absolute top-0 z-[999] w-full h-full text-white select-none">
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-[2px] z-30" onClick={exit} />
    <div className="fixed mt-14 z-50 w-1/2 h-[88%] top-0 right-4" ref={mainDiv}>
      <div className="dark:bg-secondary-200/dark bg-primary-100 h-full w-full p-2 rounded-xl flex flex-col items-center relative shadow-xl animate-[slide_.75s_cubic-bezier(0,0,0.2,1)_1] overflow-scroll">
        <Exit
          className="absolute top-0 left-0 fill-text/dark p-1.5 bg-opacity-50 hover:bg-opacity-70 transition-opacity duration-500 rounded-full scale-75"
          onClick={exit}
        />
        <RouteDisplay routeInfo={routeInfo} />
      </div>
    </div>
  </div>
}