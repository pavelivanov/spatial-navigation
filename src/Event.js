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
    if (!Boolean(priority in this.handlers)) {
      this.handlers[String(priority)] = []
    }

    this.handlers[String(priority)].push(handler)
  }

  removeHandler(handler, priority = 1) {
    if (!Boolean(priority in this.handlers)) {
      this.handlers[String(priority)] = []
    }

    const handlerIndex = this.handlers[priority].indexOf(handler)

    if (~handlerIndex) {
      return this.handlers[priority].splice(handlerIndex, 1);
    }
  }

  call(eventArgs) {
    const dispatchedEvent = new DispatchedEvent
    const handlersByPriorities = Object.keys(this.handlers).map((key) => Number(key)).sort().reverse().map((key) => this.handlers[key])

    if (!Boolean(handlersByPriorities.length)) {
      return
    }

    for (let i = 0; i < handlersByPriorities.length; i++) {
      const handlers = handlersByPriorities[i]

      if (dispatchedEvent.isPropagationStopped()) {
        break
      }

      for (let j = 0; j < handlers.length; j++) {
        const handler = handlers[j]

        if (dispatchedEvent.isPropagationStopped()) {
          break
        }

        handler(eventArgs, dispatchedEvent)
      }
    }
  }
}

export default Event
