import EA from './EventAggregator'
import ContainerCollection from './ContainerCollection'
import Container from './Container'
import { EVENT_PREFIX } from './util/constants'


class Layout {
  constructor() {
    this.containers = ContainerCollection
  }

  init(options, setting) {
    for (const containerName in options) {
      const container = Container.create(containerName, options[containerName].map)
      this.containers.add(container, containerName)

      if (Boolean(options[containerName].bind)) {
        container.bindKeyAction(options[containerName].bind)
      }
    }

    if (setting.startContainerName) {
      EA.once(`${EVENT_PREFIX}addElement`, (container) => {
        if (container.name == setting.startContainerName) {
          container.focus()
          return true
        }

        return false
      })
    }
  }
}

export default new Layout
