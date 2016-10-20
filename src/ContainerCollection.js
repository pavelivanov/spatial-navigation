import Collection from './Collection'
import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'


class ContainerCollection extends Collection {
  constructor() {
    super()

    this.focusedContainer = null

    this.didMount()
  }

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}keypress`, ::this.onNavigate, 1)
    EA.subscribe(`${EVENT_PREFIX}focusContainer`, ::this.onContainerFocused)
    EA.subscribe(`${EVENT_PREFIX}userFocusElement`, ::this.onUserFocusElement)
  }

  onNavigate(direction) {
    console.log(direction);
    const containerNameToNavigate = this.focusedContainer.getContainerToNavigate(direction)
    const containerToNavigate = this.getByName(containerNameToNavigate)

    if (containerToNavigate) {
      this.focusedContainer.blur()
      containerToNavigate.focus()
    }
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
