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
    EA.subscribe('navigate', (direction) => {
      const containerNameToNavigate = this.focusedContainer.getContainerToNavigate(direction)
      const containerToNavigate = this.getByName(containerNameToNavigate)

      if (containerToNavigate) {
        this.focusedContainer.unfocus()
        containerToNavigate.focus()
      }
    }, 1)

    EA.subscribe('focusContainer', (container) => {
      this.focusedContainer = container
    })
  }
}

export default new ContainerCollection
