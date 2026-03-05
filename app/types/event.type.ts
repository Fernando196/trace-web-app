import type { LatLngExpression } from 'leaflet'

export interface Event {
  id: number
  name: string
  description: string
  image: string
  location: {
    name: string
    coordinates: LatLngExpression
  }
  km: string
  date: string
}
