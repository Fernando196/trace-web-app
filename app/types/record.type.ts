export interface Race {
  id: number
  name: string
  description: string
  image: string
  location: {
    lat: number
    lng: number
  }
  cityName: string
}
