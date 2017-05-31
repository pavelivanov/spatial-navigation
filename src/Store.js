import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'


// Use as @decorator on other components to enhance state

class Store {

  constructor() {
    this.paused = false // if `true` disable listening all keyboard events
    
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}pause`, () => {
      this.paused = true
    })

    EA.subscribe(`${EVENT_PREFIX}resume`, () => {
      this.paused = false
    })
  }
}

export default Store
