export interface Event {
  id: number
  name: string
  description: string
  image: string
  location: {
    name: string
    lat: number
    lng: number
  }
  km: string
  date: string
}
