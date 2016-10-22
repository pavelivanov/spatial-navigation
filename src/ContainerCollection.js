import Collection from './Collection'
import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'


let focusedContainer

class ContainerCollection extends Collection {
  constructor() {
    super()

    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}focusContainer`, ContainerCollection.setFocusedContainer)
    EA.subscribe(`${EVENT_PREFIX}userFocusElement`, ContainerCollection.setFocusedContainer)
  }

  getInstanceToFocus(direction, container) {
    const containerNameToNavigate = container.getContainerToNavigate(direction)

    if (!containerNameToNavigate) {
      return
    }

    const containerToNavigate = this.getByName(containerNameToNavigate)

    if (!Boolean(containerToNavigate)) {
      return
    }

    const elementsNotExist = !Boolean(containerToNavigate.getCollection().length)
    const containerDisabled = containerToNavigate.disabled

    if (elementsNotExist || containerDisabled) {
      return this.getInstanceToFocus(direction, containerToNavigate)
    }

    return containerToNavigate
  }

  static setFocusedContainer = (container) => {
    if (focusedContainer) {
      focusedContainer.blur()
    }

    focusedContainer = container
  }

  static getFocusedContainer = () => {
    return focusedContainer
  }
}

export default new ContainerCollection

export {
  ContainerCollection
}
