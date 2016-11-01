import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'
import Container from './Container'
import ContainerNavigation from './ContainerNavigation'
import ElementNavigation from './ElementNavigation'


class Navigation {
  constructor() {
    /**
     *
     * @type {Element}
     */
    this.focusedElement = null

    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}navigate`, (actionName) => {
      if (~[ 'up', 'down', 'left', 'right' ].indexOf(actionName)) {
        this.navigate(actionName)
      }
    })
    EA.subscribe(`${EVENT_PREFIX}focusElement`, ::this.setFocusedElement)
  }

  navigate(direction, instance = this.focusedElement) {
    let instanceToFocus = ElementNavigation.getToNavigate(instance, direction)
    
    if (!instanceToFocus) {
      if (instance.parent instanceof Container) {
        instanceToFocus = ContainerNavigation.getToNavigate(instance.parent, direction)
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
