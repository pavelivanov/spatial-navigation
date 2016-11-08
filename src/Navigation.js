import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'
import Container from './Container'
import ContainerNavigation from './ContainerNavigation'
import ElementNavigation from './ElementNavigation'


class Navigation {
  constructor() {
    /**
     * @type {null|Element}
     */
    this.focusedElement = null

    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}navigate`, ::this.navigate)
    EA.subscribe(`${EVENT_PREFIX}focusElement`, ::this.setFocusedElement)
  }

  navigate(actionName) {
    if (!~[ 'up', 'down', 'left', 'right' ].indexOf(actionName)) {
      return
    }

    const instanceToFocus = this.getInstanceToFocus(actionName)

    if (!instanceToFocus) {
      return
    }

    this.focusInstance(instanceToFocus)
  }

  getInstanceToFocus(direction, instance = this.focusedElement) {
    if (!Boolean(instance)) {
      return null
    }

    let instanceToFocus = ElementNavigation.getToNavigate(instance, direction)

    // if there is no Element to navigate in passed direction
    if (!instanceToFocus) {
      // if parent of Element is Container
      if (instance.parent instanceof Container) {
        instanceToFocus = ContainerNavigation.getToNavigate(instance.parent, direction)
      }
      // if parent of Element is Element
      else {
        return this.getInstanceToFocus(direction, instance.parent)
      }
    }

    return instanceToFocus
  }
  
  focusInstance(instance) {
    const prevFocusedElement = this.focusedElement

    instance.focus()

    // dispatch event of collection focused element belongs to
    if (instance.parent && instance.parent.collection) {
      instance.parent.collection.eventAggregator.dispatchEvent('onNavigate')
    }

    // dispatch event of parent of collection focused element belongs to
    if (
      prevFocusedElement && 
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
