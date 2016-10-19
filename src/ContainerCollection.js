import Collection from './Collection'
import EA from './EventAggregator'


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
    EA.subscribe('navigate', ::this.onNavigate, 1)
    EA.subscribe('focusContainer', ::this.onContainerFocused)
    EA.subscribe('userFocusElement', ::this.onUserFocusElement)
  }

  onNavigate(direction) {
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
