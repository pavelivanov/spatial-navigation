import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'
import aggregation from './util/aggregation'
import ContainerCollection from './ContainerCollection'
import Container from './Container'
import Element from './Element'


class Navigation {
  constructor() {
    this.focusedElement = null

    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}navigate`, (direction) => ::this.navigate(direction))
    EA.subscribe(`${EVENT_PREFIX}focusElement`, ::this.setFocusedElement)
  }

  navigate(direction, instance = this.focusedElement) {
    let instanceToFocus = instance.parent.collection.getInstanceToFocus(direction)

    if (!instanceToFocus) {
      if (instance.parent instanceof Container) {
        instanceToFocus = ContainerCollection.getInstanceToFocus(direction, instance.parent)
      }
      else {
        return this.navigate(direction, instance.parent)
      }
    }

    if (!instanceToFocus) {
      return
    }

    instanceToFocus.focus()
  }

  setFocusedElement(element) {
    this.focusedElement = element
  }
}

export default new Navigation
