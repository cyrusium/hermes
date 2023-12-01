export interface RouteInfo {
  id: string,
  start: string,
  end: string,
  routes: {
    stops: {
      index: number,
      name: string,
    }[],
    enter_id: number,
    exit_id: number,
    bus_position: number,
    id: string,
    accessibility: {
      motor: boolean | null,
      visual: boolean | null,
      preferential: boolean | null,
    },
    features: {
      wifi: boolean | null,
      ac: boolean | null,
      charger: boolean | null,
      bathroom: boolean | null,
    },
    fuel: Fuel
  }[]
}

export const enum Fuel {
  Diesel = "diesel",
  NaturalGas = "gnv",
  Gasoline = "gasoline",
  Electric = "electric",
  Hydrogen = "hydrogen",
  Biodiesel = "biodiesel",
  Ethanol = "ethanol",
  Methanol = "methanol",
}

export const enum TAB {
  ROUTE,
  ACCESSIBILITY,
  MORE_INFO,
}

export type TabProps = {
  children?: never,
  route_info: RouteInfo
} & JSX.IntrinsicElements['div'];

export interface Route {
  title: string,
  hasConnection: boolean,
  start: string,
  end: string,
  features: RouteInfo['routes'][0]['features'],
  accessibility: RouteInfo['routes'][0]['accessibility'],
  fuel: RouteInfo['routes'][0]['fuel'],
  id: string
}

export interface FilterFormData {
  weekday: string;
  origin: string;
  destiny: string;
  'origin-time': string;
  'destiny-time': string;
  accessibility: string[];
  more: string[];
  fuel: string[];
}