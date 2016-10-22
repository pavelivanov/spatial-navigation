import EA from './EventAggregator'
import ContainerCollection from './ContainerCollection'
import Container from './Container'
import { EVENT_PREFIX } from './util/constants'


class Layout {
  constructor() {
    this.containers = ContainerCollection
  }

  init(options) {
    for (const containerName in options) {
      const container = Container.create(containerName, options[containerName].map)
      this.containers.add(container, containerName)

      if (Boolean(options[containerName].bind)) {
        container.bindKeyAction(options[containerName].bind)
      }

      if (Boolean(options[containerName].settings.startContainer)) {
        EA.once(`${EVENT_PREFIX}addElement`, (container) => {
          if (container.name == containerName) {
            container.focus()
            return true
          }

          return false
        })
      }
    }
  }
}

export default new Layout
