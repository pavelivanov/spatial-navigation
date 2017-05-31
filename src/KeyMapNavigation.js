import EA, { EVENT_PREFIX } from './EventAggregator'
import Navigation from './Navigation'


class KeyMapNavigation {

  constructor() {
    this.map = {}
    
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}keypress`, ::this.navigate)
  }

  navigate(keyCombination) {
    const instanceToNavigate = this.getInstance(keyCombination)

    if (instanceToNavigate) {
      const prevFocusedElement = Navigation.focusedElement

      const { event, handler } = EA.subscribe(`${EVENT_PREFIX}esc`, () => {
        prevFocusedElement.focus()
      })

      EA.once(`${EVENT_PREFIX}blurElement`, (element) => {
        if (instanceToNavigate == element) {
          event.removeHandler(handler)
          return true
        }
      })
      
      instanceToNavigate.focus()
    }
  }
  
  addRelation(map, instance) {
    for (let keyCombination in map) {
      this.map[keyCombination] = instance
    }
  }

  getInstance(keyCombination) {
    return this.map[keyCombination]
  }
}

export default new KeyMapNavigation
