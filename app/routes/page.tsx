"use client"
import Link from "next/link"
import { useLayoutEffect, useRef, useState } from "react"
import wretch from "@util/wretch"
import type { FilterFormData, Route } from "@util/types"
import { routes } from "@mock"

export default function Search() {
  const [renderRoutes, setRenderRoutes] = useState(routes);
  const [isFilterOpen, setOpenState] = useState<boolean>(true);
  const [destiny_list, setDestinyList] = useState<string[]>([]);
  const cardGrid = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const filterNav = useRef<HTMLDetailsElement>(null as unknown as HTMLDetailsElement);
  const filterNavForm = useRef<HTMLFormElement>(null as unknown as HTMLFormElement);
  useLayoutEffect(() => {
    if (isFilterOpen) {
      cardGrid.current.classList.remove("pt-32");
      cardGrid.current.classList.add("pt-64");
      cardGrid.current.classList.remove("animate-[close-filter_.75s_cubic-bezier(0,0,0.2,1)_1]");
      cardGrid.current.classList.add("animate-[open-filter_.75s_cubic-bezier(0,0,0.2,1)_1]");
    }
    else {
      cardGrid.current.classList.remove("pt-64");
      cardGrid.current.classList.add("pt-32");
      cardGrid.current.classList.remove("animate-[open-filter_.75s_cubic-bezier(0,0,0.2,1)_1]");
      cardGrid.current.classList.add("animate-[close-filter_.75s_cubic-bezier(0,0,0.2,1)_1]");
    }
  }, [isFilterOpen]);

  const [controller, setController] = useState<AbortController | null>(null);

  const submitFilterChange = (data: FilterFormData) => {
    console.log(data);
    controller?.abort();
    const c = new AbortController();
    setController(c);
    wretch
      .signal(c)
      .post(data)
      .onAbort((_: any) => { })
      .json(console.log);
  }

  const handleFilterChange = (data?: FormData) => {
    const filterData: FilterFormData = {
      weekday: '',
      origin: '',
      destiny: '',
      'origin-time': '',
      'destiny-time': '',
      accessibility: [],
      more: [],
      fuel: [],
    };
    if (typeof data === 'undefined') return submitFilterChange(filterData);
    const formDataArray = Array.from(data.entries()) as [string, string][];
    for (const [key, value] of formDataArray) {
      switch (key) {
        case 'weekday':
        case 'origin':
        case 'destiny':
        case 'origin-time':
        case 'destiny-time':
          filterData[key] = value || '';
          break;
        case 'accessibility':
        case 'more':
        case 'fuel':
          if (value !== '') {
            filterData[key].push(value);
          }
          break;
        default:
          break;
      }
    }
    setDestinyList(routes.filter(el => typeof el !== "undefined" && el.start === filterData.origin).map(route => route!.end));
    setRenderRoutes(routes.filter(el =>
      typeof el === "undefined" ||
      ((filterData.origin === "" || el.start.toLowerCase().includes(filterData.origin.toLowerCase())) &&
        (filterData.destiny === "" || el.end.toLowerCase().includes(filterData.destiny.toLowerCase()))
      )
      && (filterData.accessibility.reduce((acc, cur) => acc || (el.accessibility[cur as keyof Route["accessibility"]] ?? false), false) || filterData.accessibility.length === 0)
      && (filterData.more.reduce((acc, cur) => acc || (el.features[cur as keyof Route["features"]] ?? false), false) || filterData.more.length === 0)
      && (filterData.fuel.includes(el.fuel) || filterData.fuel.length === 0)
    ));
    // submitFilterChange(filterData);
  }

  return <div className="mt-12 relative dark:text-white flex flex-col items-center">
    <details
      className="absolute w-2/3 dark:bg-background/dark select-none z-10 dark:bg-opacity-40 backdrop-blur rounded-xl py-3"
      open={true}
      onToggle={() => setOpenState(filterNav.current.open)}
      ref={filterNav}
    >
      <summary className="pl-12 py-2 text-2xl font-bold">Filtros <button type="reset" form="filter-nav" className={`ml-4 p-1 px-4 text-lg backdrop-blur-sm dark:bg-secondary-200/dark dark:bg-opacity-40 rounded-xl -translate-y-0.5 font-light ${(filterNav?.current?.open ?? true) ? "" : "hidden"}`}>Remover filtros</button></summary>
      <form
        ref={filterNavForm}
        className="w-full py-6 flex flex-row items-start justify-evenly"
        id="filter-nav"
        action={""}
        method="POST"
        onSubmit={e => {
          e.preventDefault();
        }}
        onChange={() => handleFilterChange(new FormData(filterNavForm.current))}
        onReset={() => handleFilterChange()}
      >
        <datalist id="origin_list">
          {routes.filter(el => typeof el !== "undefined").map(el => el!.start).filter((v, i, self) => i == self.indexOf(v)).map((stop, i) => <option key={i} value={stop} />)}
        </datalist>
        <datalist id="destiny_list">
          {destiny_list.filter((v, i, self) => i == self.indexOf(v)).map((stop, i) => <option key={i} value={stop} />)}
        </datalist>
        <div>
          <p className="px-4 py-2 dark:text-text/dark text-text bg-primary dark:bg-secondary/dark rounded-xl text-center mb-1.5">Dia da semana:</p>
          <input className="bg-transparent bg-secondary-100 dark:border-secondary-400/dark border-4 mr-2 -translate-y-0.5 checked:bg-primary dark:checked:border-secondary-400/dark dark:checked:bg-text/dark scale-125" type="radio" id="mon-to-fri" name="weekday" value="mon-to-fri" checked={true} />
          <label className="dark:text-text/dark" htmlFor="mon-to-fri">Segunda à Sexta</label><br />
          <div className="relative">
            <div className="absolute w-full h-full backdrop-blur top-0 left-0 rounded-lg flex flex-col items-center">
              <p className={`font-black md:translate-y-0.5 px-4 p-1 rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-orange-600 text-white my-auto`}>Indisponível</p>
            </div>
            <div>
              <input className="bg-transparent bg-secondary-100 dark:border-secondary-400/dark border-4 mr-2 -translate-y-0.5 checked:bg-primary dark:checked:border-secondary-400/dark dark:checked:bg-text/dark scale-125" type="radio" id="sat" name="weekday" value="sat" disabled={true} />
              <label className="dark:text-text/dark" htmlFor="sat">Sabado</label><br />
              <input className="bg-transparent bg-secondary-100 dark:border-secondary-400/dark border-4 mr-2 -translate-y-0.5 checked:bg-primary dark:checked:border-secondary-400/dark dark:checked:bg-text/dark scale-125" type="radio" id="sun" name="weekday" value="sun" disabled={true} />
              <label className="dark:text-text/dark" htmlFor="sun">Domigo ou Feriados</label>

            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-col items-center gap-4">
            <input type="search" placeholder="Origem" name="origin" list="origin_list" className="dark:bg-secondary-400/dark dark:text-text/dark bg-primary text-text placeholder:text-text dark:placeholder:text-text-200/dark border-transparent rounded-xl" />
            <input type="search" placeholder="Destino" name="destiny" list="destiny_list" className="dark:bg-secondary-400/dark dark:text-text/dark bg-primary text-text placeholder:text-text dark:placeholder:text-text-200/dark border-transparent rounded-xl" />
          </div>
          <div className="ml-8 relative">
            <div className="flex flex-col items-center gap-4">
              <div className="absolute w-[125%] h-[125%] backdrop-blur top-0 left-0 -m-2 rounded-lg flex flex-col items-center">
                <p className={`font-black md:translate-y-0.5 px-4 p-1 rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-orange-600 text-white my-auto`}>Indisponível</p>
              </div>
              <input type="time" placeholder="Origem" name="origin-time" className="dark:bg-secondary-400/dark dark:text-text/dark bg-primary text-text border-transparent rounded-xl px-4" disabled={true} />
              <input type="time" placeholder="Destino" name="destiny-time" className="dark:bg-secondary-400/dark dark:text-text/dark bg-primary text-text border-transparent rounded-xl px-4" disabled={true} />
            </div>
          </div>
        </div>
        <div className="mr-12 w-1/6 flex flex-col items-center gap-4">
          <details className="grid grid-cols-2 grid-rows-4 dark:bg-secondary/dark text-text bg-primary rounded-xl px-4 pb-2 pt-1 w-full">
            <summary>Acessibilidades</summary>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="accessibility" id="accessibility-motor" value="motor" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="accessibility-motor" title="Elevador e área reservada para pessoa com deficiência em cadeira de rodas">Motora</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="accessibility" id="accessibility-visual" value="visual" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="accessibility-visual" title="Área reservada para pessoa acompanhada de cão-guia">Visual</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="accessibility" id="accessibility-preferential" value="preferential" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="accessibility-preferential" title="Assento preferencial para obesos, gestantes, pessoas com bebês ou crianças de colo, idosos e pessoas com deficiência">Assento Preferencial</label>
            </div>
          </details>
          <details className="grid grid-cols-2 grid-rows-4 dark:bg-secondary/dark text-text bg-primary rounded-xl px-4 pb-2 pt-1 w-full">
            <summary>Mais</summary>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="more" id="more-wifi" value="wifi" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="more-wifi">Wi-Fi</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="more" id="more-ac" value="ac" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="more-ac">Ar-condicionado</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="more" id="more-ac" value="ac" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="more-ac">Carregador</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="more" id="more-articulated" value="articulated" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="more-articulated">Articulado</label>
            </div>
          </details>
          <details className="grid grid-cols-2 grid-rows-4 dark:bg-secondary/dark text-text bg-primary rounded-xl px-4 pb-2 pt-1 w-full">
            <summary>Combustível</summary>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-diesel" value="diesel" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-diesel">Diesel</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-gnv" value="gnv" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-gnv">Gás natural veícular</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-gasoline" value="gasoline" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-gasoline">Gasolina</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-eletric" value="eletric" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-eletric">Elétrico</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-hydrogen" value="hydrogen" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-hydrogen">Hidrogênio</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-biodiesel" value="biodiesel" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-biodiesel">Biodiesel</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-ethanol" value="ethanol" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-ethanol">Etanól</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" name="fuel" id="fuel-methanol" value="methanol" />
              <label className="dark:text-text/dark dark:hover:text-text-200/dark" htmlFor="fuel-methanol">Metano</label>
            </div>
          </details>
        </div>
      </form>
    </details>
    <div className="grid grid-flow-row max-2xl:grid-cols-2 2xl:grid-cols-2 gap-8 items-center pt-64 place-items-center max-w-5xl mx-auto" ref={cardGrid}>
      {renderRoutes.slice(0, 50).map((route, index) => {
        if (typeof route !== "undefined") {
          const tags: string[] = []
          if (route.accessibility.motor) tags.push("Aces. Motora")
          if (route.accessibility.visual) tags.push("Aces. Visual")
          if (route.accessibility.preferential) tags.push("Banco Pref.")
          if (route.features.ac) tags.push("Ar-condicionado")
          if (route.features.bathroom) tags.push("Banheiro")
          if (route.features.charger) tags.push("Carregador")
          if (route.features.wifi) tags.push("Wi-Fi")

          return <Link href={`/route/${route.id}`} key={route.id} className="w-96 hover:dark:bg-primary/dark dark:bg-secondary/dark group-hover:bg-secondary-100 bg-primary-100 p-4 select-none rounded-xl group transition-all duration-300">
            <p className="group-hover:dark:bg-secondary-400/dark dark:bg-primary/dark group-hover:bg-primary-100 bg-secondary text-text max-w-fit px-3 py-1 rounded-full font-bold">{route.title}</p>
            <p className="dark:text-text/dark text-text mt-3">Inicio: {route.start}</p>
            <p className="dark:text-text/dark text-text mt-3">Fim: {route.end}</p>
            <div className="flex flex-row items-center mt-3 gap-2 select-none">
              {tags.map(tag => <span key={tag} className="group-hover:dark:bg-secondary-400/dark dark:bg-primary/dark group-hover:bg-primary-100 bg-secondary text-text px-3 rounded-3xl font-bold text-sm">{tag}</span>)}
            </div>
          </Link>
        }
        else {
          return <div key={index} className="w-96 hover:dark:bg-primary/dark dark:bg-secondary/dark group-hover:bg-secondary-100 bg-primary-100 p-4 select-none rounded-xl group transition-all duration-300">
            <div className="group-hover:dark:bg-secondary-400/dark dark:bg-primary/dark group-hover:bg-primary-100 bg-secondary text-text w-28 h-8 px-3 py-1 rounded-full animate-pulse" />
            <div className="dark:bg-text/dark bg-opacity-25 w-56 h-5 mt-3 rounded-md animate-pulse" />
            <div className="dark:bg-text/dark bg-opacity-25 w-56 h-5 mt-3 rounded-md animate-pulse" />
            <div className="flex flex-row items-center mt-4 gap-2 select-none">
              <div className="group-hover:dark:bg-secondary-400/dark dark:bg-primary/dark group-hover:bg-primary-100 bg-secondary text-text px-3 rounded-3xl font-bold w-20 h-6 animate-pulse" />
              <div className="group-hover:dark:bg-secondary-400/dark dark:bg-primary/dark group-hover:bg-primary-100 bg-secondary text-text px-3 rounded-3xl font-bold w-20 h-6 animate-pulse" />
              <div className="group-hover:dark:bg-secondary-400/dark dark:bg-primary/dark group-hover:bg-primary-100 bg-secondary text-text px-3 rounded-3xl font-bold w-20 h-6 animate-pulse" />
              <div className="group-hover:dark:bg-secondary-400/dark dark:bg-primary/dark group-hover:bg-primary-100 bg-secondary text-text px-3 rounded-3xl font-bold w-20 h-6 animate-pulse" />
            </div>
          </div>
        }
      })}
    </div>
  </div>
}