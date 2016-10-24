import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'
import ContainerCollection from './ContainerCollection'
import Container from './Container'


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

    this.focusInstance(instanceToFocus)
  }
  
  focusInstance(instance) {
    // TODO refactor this! After instance focused this.focusedElement changes and `onNavigate` events don't invoke
    const prevFocusedElement = this.focusedElement

    instance.focus()

    // dispatch event of collection focused element belongs to
    if (instance.parent && instance.parent.collection) {
      instance.parent.collection.eventAggregator.dispatchEvent('onNavigate')
    }

    // dispatch event of parent of collection focused element belongs to
    if (
      instance.parent && prevFocusedElement.parent
      && instance.parent != prevFocusedElement.parent
      && instance.parent.parent && instance.parent.parent.collection
    ) {
      instance.parent.parent.collection.eventAggregator.dispatchEvent('onNavigate')
    }
  }

  setFocusedElement(element) {
    this.focusedElement = element
  }
}

export default new Navigation
