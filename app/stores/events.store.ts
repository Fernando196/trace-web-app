import { defineStore } from 'pinia'
import type { Event } from '~/types/event.type'

export const useReacesStore = defineStore('events', () => {
  const isLoading = ref<boolean>(false)
  const events = ref<Event[]>([])
  const selectedRace = ref<Event | null>(null)
  const dayjs = useDayjs()

  async function getRaces() {
    try {
      isLoading.value = true

      await Promise.resolve(() => setTimeout(() => {}, 1000))

      const newRaces: Event[] = Array.from(
        { length: 100 },
        (_: undefined, index: number) => ({
          id: index + 1,
          name: 'Carrera ' + index,
          description:
            'Exercitation eu mollit sit ad consectetur eu occaecat et ex incididunt sunt consequat. Consequat adipisicing ex culpa tempor elit aliquip aute do voluptate sit. Anim velit nulla ipsum ut labore cillum ipsum mollit eiusmod. Dolor est ipsum id pariatur consequat minim ex adipisicing amet laborum anim anim. Lorem exercitation et id non aliquip anim quis officia deserunt ea esse aliquip consequat.',
          image:
            'https://scontent.fntr6-3.fna.fbcdn.net/v/t39.30808-6/514104527_719767494084553_8228095185011851050_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=BIfeIPLNjE4Q7kNvwGpRfvN&_nc_oc=AdlrIzp_btEkygNXQbNWOS_bPcAe0N4zV3qJrjrAdnIHtEtPJ2TU6FT0DRoDb1LpWIE&_nc_zt=23&_nc_ht=scontent.fntr6-3.fna&_nc_gid=ec7ftq5cZudyCoTNngK-og&oh=00_AfvrjdJOXB4McKy97hPMVWe5wJPoy9iiT_w4NCBt-06izQ&oe=69A6B619',
          location: {
            name: 'Nuevo Laredo, Tamp',
            lat: 10.0,
            lng: 10.0,
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
