import Event from './Event'


class EventAggregator {
  constructor() {
    this.events = []
  }

  getEvent(eventName) {
    return this.events.filter((event) => event.name === eventName)[0]
  }

  dispatchEvent(eventName, eventArgs) {
    let event = this.getEvent(eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    event.call(eventArgs)
  }

  subscribe(eventName, handler) {
    let event = this.getEvent(eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    event.addHandler(handler)
  }
}

export default new EventAggregator
