class DispatchedEvent {

  constructor() {
    this.propagationStopped = false
  }

  isPropagationStopped() {
    return this.propagationStopped
  }

  stopPropagation() {
    this.propagationStopped = true
  }
}

class Event {

  constructor(name) {
    this.name = name
    this.handlers = {}
  }

  addHandler(handler, priority = 1) {
    if (!(priority in this.handlers)) {
      this.handlers[String(priority)] = []
    }
    this.handlers[String(priority)].push(handler)
  }

  removeHandler(handler, priority = 1) {
    // TODO why we need to create new array by property?
    if (!(priority in this.handlers)) {
      this.handlers[String(priority)] = []
    }

    const handlerIndex = this.handlers[priority].indexOf(handler)

    if (~handlerIndex) {
      // TODO why return result
      return this.handlers[priority].splice(handlerIndex, 1);
    }
  }

  /**
   * Call all handlers in all priorities
   *
   * @param eventArgs
   */
  // TODO why whe not using ...eventArgs? In EventAggregator we passing ...eventArgs, so here we use only first parameter
  call(eventArgs) {
    if (!Object.keys(this.handlers).length) {
      return
    }

    const dispatchedEvent = new DispatchedEvent

    for (let priority in this.handlers) {
      if (!this.handlers.hasOwnProperty(priority)) {
        continue
      }

      // TODO why isPropagationStopped used twice? Is it if propagation will be stopped in time of iteration?
      if (dispatchedEvent.isPropagationStopped()) {
        continue
      }

      this.handlers[priority].forEach((handler) => {
        // TODO why isPropagationStopped used twice?
        // if (dispatchedEvent.isPropagationStopped()) {
        //   break
        // }

        // TODO why whe not using ...eventArgs?
        // TODO why we passing dispatchedEvent? We never use it!?
        handler(eventArgs, dispatchedEvent)
      })
    }
  }
}

export default Event
