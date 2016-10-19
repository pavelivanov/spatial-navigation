import Enhancer from './Enhancer'
import EA from './EventAggregator'


class Keyboard extends Enhancer {
  constructor() {
    super()
    
    // TODO move outside to dynamically add keys
    this.keyMapping = {
      '37': 'left',
      '38': 'up',
      '39': 'right',
      '40': 'down'
    }
  }

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    document.addEventListener('keyup', (event) => {
      if (!Boolean(event.keyCode in this.keyMapping)) return
      const direction = this.keyMapping[event.keyCode]
      EA.dispatchEvent('navigate', direction)
    })
  }
}

export default new Keyboard
