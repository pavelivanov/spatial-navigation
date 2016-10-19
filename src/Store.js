import EA from './EventAggregator'


// Use as @decorator on other components to enhance state

class Store {
  constructor() {
    this.paused = false // if `true` disable listening all keyboard events
    
    this.didMount()
  }

  didMount() {
    this.bindListeners()
  }
  
  bindListeners() {
    EA.subscribe('pause', () => {
      this.paused = true
    })

    EA.subscribe('resume', () => {
      this.paused = false
    })
  }
}

export default Store
