export interface Route {
  name: string
  path: string
}

export type RoutePointType = 'start' | 'water' | 'checkpoint' | 'finish'

export interface RoutePoint {
  lat: number
  lng: number
  type: RoutePointType
  order: number
  description?: string
}
