import Event from './Event'


class EventAggregator {
  constructor() {
    this.events = []
  }

  getEvent(eventName) {
    return this.events.filter((event) => event.name === eventName)[0]
  }

  dispatchEvent(eventName, ...eventArgs) {
    let event = this.getEvent(eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    event.call(...eventArgs)
  }

  subscribe(eventName, handler, priority) {
    let event = this.getEvent(eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    event.addHandler(handler, priority)
  }

  once(eventName, handler, priority) {
    let event = this.getEvent(eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    event.addHandler((...args) => {
      const result = handler(...args)
      if (result) {
        for (let i = 0; i < this.events.length; i++) {
          const _event = this.events[i]

          if (_event == event) {
            this.events.splice(i, 1)
            break
          }
        }
      }
    }, priority)
  }
}

export default new EventAggregator
