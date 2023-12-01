"use client"
import { type RouteInfo, type TabProps, TAB } from "@util/types";
import { useLayoutEffect, useState } from "react";

export default function Component({ routeInfo }: { routeInfo: RouteInfo | null, children?: never }) {
  const [tab, setTab] = useState<TAB>(TAB.ROUTE);
  const [lastTab, setLastTab] = useState<TAB>(TAB.ROUTE);

  useLayoutEffect(() => {
    if (tab !== lastTab) setLastTab(tab);
  }, [tab, lastTab]);

  const TabElement = tab == TAB.ROUTE
    ? Route
    : tab == TAB.ACCESSIBILITY
      ? Accessibility
      : MoreInfo;

  return <>
    {(routeInfo !== null)
      ? (<h3 className="text-2xl font-bold pt-1">{routeInfo.start} - {routeInfo.end}</h3>)
      : (<h3 className="w-[32rem] bg-black rounded-lg h-8 mt-1.5 bg-opacity-50 animate-pulse" />)
    }
    <nav className="flex flex-row items-center justify-evenly w-full mt-4 text-lg font-bold">
      <button
        type="button"
        onClick={() => setTab(TAB.ROUTE)}
        className={`dark:decoration-accent/dark decoration-[.2rem]${tab == TAB.ROUTE ? " underline" : ""}`}
      >Rotas</button>
      <button
        type="button"
        onClick={() => setTab(TAB.ACCESSIBILITY)}
        className={`dark:decoration-accent/dark decoration-[.2rem]${tab == TAB.ACCESSIBILITY ? " underline" : ""}`}
      >Acessibilidade</button>
      <button
        type="button"
        onClick={() => setTab(TAB.MORE_INFO)}
        className={`dark:decoration-accent/dark decoration-[.2rem]${tab == TAB.MORE_INFO ? " underline" : ""}`}
      >Mais informações</button>
    </nav>
    {(routeInfo !== null) && <TabElement route_info={routeInfo} />}
  </>
}

function Route({ route_info }: TabProps) {
  return <div
    className="flex flex-col items-center w-full gap-4 mt-8"
  >{route_info.routes.map((route, index) => {
    const stops_length = route.stops.length;
    return <details key={route.id} className="w-full dark:bg-primary/dark bg-primary-400 rounded-lg p-2 px-4" open={index === 0}>
      <summary className="text-lg font-bold">
        Onibus {index + 1}
        <span className="ml-4 text-base">
          <span className="dark:bg-secondary-400/dark bg-secondary rounded-lg px-2 py-0.5 mr-1">
            {route.stops[route.enter_id].name}
          </span>
          &gt;
          <span className="dark:bg-secondary-400/dark bg-secondary rounded-lg px-2 py-0.5 ml-1">
            {route.stops[route.exit_id].name}
          </span>
        </span>
      </summary>
      <div className="leading-loose inline-flex flex-wrap">
        {route.stops.map((stop, index) => {
          return <p key={`${stop.name}/${stop.index}-${index}`} className="w-max">
            <span
              className={`${(route.enter_id == index || route.exit_id == index) ? "font-semibold" : ""} dark:bg-secondary-400/dark dark:text-text/dark text-text bg-secondary rounded-lg px-2 p-0.5 mx-1`}
            >
              {stop.name}
            </span>
            {index + 1 !== stops_length && <span className="font-bold">&gt;</span>}
          </p>
        })}
      </div>
    </details>
  }
  )}</div>
}

function Accessibility({ route_info }: TabProps) {
  return <div
    className="flex flex-col items-center w-full gap-4 mt-8"
  >{route_info.routes.map((route, index) => {
    return <details key={route.id} className="w-full dark:bg-primary/dark rounded-lg p-2 px-4" open={index === 0}>
      <summary className="text-lg font-bold">
        Onibus {index + 1}
      </summary>
      <div>
        <p className="font-bold">Acessibilidade</p>
        <div className="mt-3 mb-4 flex flex-row gap-16">
          <div className="flex flex-row gap-1">
            <div className={`translate-y-0.5 w-5 h-5 rounded-full ${route.accessibility.motor ? "dark:bg-accent/dark bg-accent" : "dark:bg-accent-100/dark bg-accent-100"}`}></div>
            <span>Plataforma elevatória</span>
          </div>
          <div className="flex flex-row gap-1">
            <div className={`translate-y-0.5 w-5 h-5 rounded-full ${(route.accessibility.motor || route.accessibility.visual) ? "dark:bg-accent/dark bg-accent" : "dark:bg-accent-100/dark bg-accent-100"}`}></div>
            <span title="Espaço reservado para cadeiras de roda ou cães guia">Área reservada</span>
          </div>
          <div className="flex flex-row gap-1">
            <div className={`translate-y-0.5 w-5 h-5 rounded-full ${route.accessibility.preferential ? "dark:bg-accent/dark bg-accent" : "dark:bg-accent-100/dark bg-accent-100"}`}></div>
            <span title="Banco reservado para idosos, grávidas, obesos e/ou pessoas com autismo">Banco preferencial</span>
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold">Comodidades</p>
        <div className="mt-3 mb-4 flex flex-row gap-16">
          <div className="flex flex-row gap-1">
            <div className={`translate-y-0.5 w-5 h-5 rounded-full ${route.features.ac ? "dark:bg-accent/dark bg-accent" : "dark:bg-accent-100/dark bg-accent-100"}`}></div>
            <span>Ar condicionado</span>
          </div>
          <div className="flex flex-row gap-1">
            <div className={`translate-y-0.5 w-5 h-5 rounded-full ${route.features.bathroom ? "dark:bg-accent/dark bg-accent" : "dark:bg-accent-100/dark bg-accent-100"}`}></div>
            <span>Banheiro</span>
          </div>
          <div className="flex flex-row gap-1">
            <div className={`translate-y-0.5 w-5 h-5 rounded-full ${route.features.charger ? "dark:bg-accent/dark bg-accent" : "dark:bg-accent-100/dark bg-accent-100"}`}></div>
            <span>Carregadores</span>
          </div>
          <div className="flex flex-row gap-1">
            <div className={`translate-y-0.5 w-5 h-5 rounded-full ${route.features.wifi ? "dark:bg-accent/dark bg-accent" : "dark:bg-accent-100/dark bg-accent-100"}`}></div>
            <span>Wi-Fi</span>
          </div>
        </div>
      </div>
    </details>
  }
  )}</div>
}

const fac = (n: number) => {
  let i = n;
  if (n == 0) return 1;
  if (n < 0) return NaN;
  while (i > 2) n *= --i;
  return n;
}

const binomialDistribution = (n: number, k: number, p: number) => {
  const nk = fac(n) / (fac(k) * fac(n - k));
  const pk = Math.pow(p, k);
  const qnk = Math.pow(1 - p, n - k);
  return nk * pk * qnk;
}

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

function MoreInfo({ route_info }: TabProps) {
  return <div
    className="flex flex-col items-center w-full gap-4 mt-8"
  >{route_info.routes.map((route, index) => {
    const chance = Math.random();
    const distribution = hours.map(h => (Math.min(binomialDistribution(24, h, chance) * 500, 100).toFixed(2) + "%"));
    return <details
      key={route.id}
      className="w-full dark:bg-primary/dark bg-primary-400 rounded-lg p-2 px-4" open={index === 0}
      onToggle={() => document.querySelector(`div[item-index="${route.id}/${route.bus_position}"]`)?.scrollIntoView()}
    >
      <summary className="text-lg font-bold">
        Onibus {index + 1}
      </summary>
      <div>
        <p className="font-bold">Localização</p>
        <div className="mt-3 mb-4 flex flex-row gap-8 overflow-auto">
          {
            route.stops.map((stop) => (<div
              key={stop.index}
              item-index={`${route.id}/${stop.index}`}
              className="flex flex-col items-center"
            >
              <p className="font-semibold w-max">{stop.name}</p>
              <div className={`w-16 h-16 rounded-full ${stop.index === route.bus_position ? "dark:bg-accent/dark bg-accent" : (stop.index === route.enter_id || stop.index === route.exit_id) ? "dark:bg-accent-100/dark bg-accent-100" : "dark:bg-text/dark bg-text"} ${(stop.index > route.bus_position && stop.index !== route.bus_position) ? "animate-pulse opacity-70" : ""}`} />
              {(stop.index === route.enter_id) && <p className="dark:bg-text/dark dark:text-background/dark font-bold -translate-y-4 px-2 rounded-xl">Entrada</p>}
              {(stop.index === route.exit_id) && <p className="dark:bg-text/dark dark:text-background/dark font-bold -translate-y-4 px-2 rounded-xl">Saída</p>}
            </div>))
          }
        </div>
      </div>
      <div>
        <p className="font-bold">Lotação</p>
        <div className="relative">
          <div className="mt-3 mb-4 grid grid-flow-row grid-cols-[repeat(24,minmax(0,1fr))] rounded-2xl">
            {distribution.map((d, i) => <div
              key={i}
              className="w-4 h-24 dark:bg-text/dark text-text origin-bottom"
              style={{ transform: `scaleY(${d})` }}
            />)}
          </div>
          <div className="backdrop-blur-sm absolute top-0 left-0 w-full h-full flex flex-col items-center bg-black bg-opacity-25 rounded-2xl">
            <p className={`font-black md:translate-y-0.5 px-4 p-1 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-fuchsia-700 to-violet-600 dark:text-white my-auto`}>Em breve</p>
          </div>
        </div>
      </div>
    </details>
  }
  )}</div>
}