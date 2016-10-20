import Collection from './Collection'
import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'


class ContainerCollection extends Collection {
  constructor() {
    super()

    this.focusedContainer = null

    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}keypress`, (actionName) => this.onNavigate(actionName), 1)
    EA.subscribe(`${EVENT_PREFIX}focusContainer`, ::this.onContainerFocused)
    EA.subscribe(`${EVENT_PREFIX}userFocusElement`, ::this.onUserFocusElement)
  }

  onNavigate(direction, focusedContainer = this.focusedContainer) {
    console.log(`Navigate direction: ${direction}`)

    const containerNameToNavigate = focusedContainer.getContainerToNavigate(direction)

    if (!containerNameToNavigate) {
      return
    }

    const containerToNavigate = this.getByName(containerNameToNavigate)

    if (!Boolean(containerToNavigate)) {
      return
    }

    const elementsNotExist = !Boolean(containerToNavigate.getElementCollection().length)
    const containerDisabled = containerToNavigate.disabled

    if (elementsNotExist || containerDisabled) {
      return this.onNavigate(direction, containerToNavigate)
    }

    this.focusedContainer.blur()
    containerToNavigate.focus()
  }

  onContainerFocused(container) {
    this.focusedContainer = container
  }

  onUserFocusElement(element) {
    this.focusedContainer.blur()
    this.focusedContainer = element.container
  }
}

export default new ContainerCollection
