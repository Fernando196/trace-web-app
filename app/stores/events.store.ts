import type { LatLngExpression } from 'leaflet'
import { defineStore } from 'pinia'
import type { Event } from '~/types/event.type'

export const useEventStore = defineStore('events', () => {
  const isLoading = ref<boolean>(false)
  const events = ref<Event[]>([])
  const selectedRace = ref<Event | null>(null)
  const dayjs = useDayjs()

  async function getRaces() {
    try {
      isLoading.value = true

      await Promise.resolve(() => setTimeout(() => {}, 1000))

      const examplesLat: LatLngExpression[] = [
        [27.4900530576361, -99.5513112617975],
        [27.456545050245122, -99.55233364407324],
        [27.41846774168036, -99.54374626818841],
        [27.47406011990198, -99.49963534741772],
        [27.48792021040221, -99.49963180094579],
        [27.435528039720843, -99.51508955514505],
        [27.49051194450086, -99.53019286049779],
      ]

      const newRaces: Event[] = Array.from(
        { length: examplesLat.length },
        (_: undefined, index: number) => ({
          id: index + 1,
          name: 'Carrera ' + index,
          description:
            'Exercitation eu mollit sit ad consectetur eu occaecat et ex incididunt sunt consequat. Consequat adipisicing ex culpa tempor elit aliquip aute do voluptate sit. Anim velit nulla ipsum ut labore cillum ipsum mollit eiusmod. Dolor est ipsum id pariatur consequat minim ex adipisicing amet laborum anim anim. Lorem exercitation et id non aliquip anim quis officia deserunt ea esse aliquip consequat.',
          image:
            'https://www.heraldo.mx/wp-content/uploads/2024/01/Carrera-mujer-696x456.jpg',
          location: {
            name: 'Nuevo Laredo, Tamp',
            coordinates: examplesLat[index]!,
          },
          km: '10k',
          date: dayjs().format('yyyy-MM-DD'),
        })
      )

      events.value = newRaces
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  function handleChangeSelected(event: Event) {
    selectedRace.value = event
  }

  return {
    events,
    selectedRace,
    handleChangeSelected,
    getRaces,
  }
})
