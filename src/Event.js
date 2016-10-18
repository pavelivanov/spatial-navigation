class Event {
  constructor(name) {
    this.name = name
    this.handlers = []
  }

  addHandler(handler) {
    this.handlers.push(handler)
  }

  removeHandler(handler) {
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i] == handler) {
        this.handlers.splice(i, 1)
        break
      }
    }
  }

  call(eventArgs) {
    this.handlers.forEach((handler) => handler(eventArgs))
  }
}

export default Event
