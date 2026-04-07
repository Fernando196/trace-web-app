import type { Marker } from 'leaflet'

export interface LMarker {
  attribution: undefined
  draggable: undefined
  icon: undefined
  latLng: number[]
  layerType: undefined
  leafletObject: Marker
  name: undefined
  options: undefined
  pane: undefined
  ready: boolean
  visible: boolean
  ZIndexOffset: undefined

  handleChangePopup: (open: boolean) => void
}
