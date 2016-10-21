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

  /**
   *
   * @param eventName
   * @param handler
   * @param priority
   * @returns {{event: *, handler: *}}
   */
  subscribe(eventName, handler, priority) {
    let event = this.getEvent(eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    event.addHandler(handler, priority)
    return { event, handler }
  }

  /**
   *
   * @param eventName
   * @param handler
   * @param priority
   * @returns {{event: *, handlerWrapper: (function(...[*]))}}
   */
  once(eventName, handler, priority) {
    let event = this.getEvent(eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    const handlerWrapper = (...args) => {
      const result = handler(...args)
      if (result) {
        event.removeHandler(handlerWrapper, priority)
      }
    }
    event.addHandler(handlerWrapper, priority)

    return { event, handlerWrapper }
  }
}

export default new EventAggregator
