import EA from './EventAggregator'
import ContainerCollection from './ContainerCollection'
import Container from './Container'


class Layout {
  constructor() {
    this.containers = ContainerCollection
  }

  init(map, opts) {
    for (const containerName in map) {
      const container = Container.create(containerName, map[containerName])
      this.containers.add(container, containerName)
    }

    if (opts.startContainerName) {
      EA.once('addElement', (container) => {
        if (container.name == opts.startContainerName) {
          container.focus()
          return true
        }

        return false
      })
    }
  }
}

export default new Layout
