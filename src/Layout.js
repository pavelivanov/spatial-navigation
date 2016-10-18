import Enhancer from './Enhancer'
import EA from './EventAggregator'
import Logger from './Logger'


class Layout extends Enhancer {
  constructor() {
    super()
    
    this.containers = []
    this.focusedContainer = null
  }

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe('navigate', (event /* { direction: 'up' } */) => {
      const navigateTo = this.focusedContainer.leaveFor[event.direction]

      for (let i = 0; i < this.containers.length; i++) {
        if (this.containers[i].name = navigateTo) {
          this.focusContainer(this.containers[i])
          break
        }
      }
    })

    // TODO is it correct to use Logger like this?
    Logger.write({
      message: 'Layout subsribed to navigate'
    })
  }

  focusContainer(container) {
    this.focusedContainer = container
    container.focus()
  }
}

export default Layout
