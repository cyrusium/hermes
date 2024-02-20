"use client"
import { useLayoutEffect, useState } from "react"
import { useParams } from "next/navigation"

import { type RouteInfo, type TabProps, TAB } from "@util/types";
import { route_info_mock } from "@mock"
import RouteDisplay from "@components/routeinfo"

export default function Slug() {
  const params = useParams();
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)

  useLayoutEffect(() => {
    setRouteInfo(route_info_mock.find(route => route.id === params.slug) ?? null);
  }, []);

  return <div className="mt-14 w-1/2 h-[88%] mx-auto select-none">
    <div className="dark:bg-secondary-200/dark bg-primary-100 dark:text-text/dark text-text h-full w-full p-2 rounded-xl flex flex-col items-center relative shadow-xl overflow-scroll">
      <RouteDisplay routeInfo={routeInfo} />
    </div>
  </div>
}