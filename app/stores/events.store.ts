import type { LatLngExpression } from 'leaflet'
import { defineStore } from 'pinia'
import { eventCoords } from '~/data/event-coords'
import type { Event } from '~/types/event.type'

export const useEventStore = defineStore('events', () => {
  const isLoading = ref<boolean>(false)
  const events = ref<Event[]>([])
  const selectedEvent = ref<Event | null>(null)
  const dayjs = useDayjs()

  async function getRaces() {
    try {
      isLoading.value = true

      await Promise.resolve(() => setTimeout(() => {}, 1000))

      const examplesLat: LatLngExpression[] = [
        [27.487099210950515, -99.56760486181],
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
          coords: eventCoords,
        })
      )

      events.value = newRaces
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  function updateSelectedEvent(event: Event) {
    selectedEvent.value = event.id === selectedEvent.value?.id ? null : event
  }

  return {
    events,
    selectedEvent,
    updateSelectedEvent,
    getRaces,
  }
})
