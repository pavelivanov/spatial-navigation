import Event from './Event'
import { EVENT_PREFIX } from './util/constants'


class EventAggregator {

  constructor() {
    this.events = []
  }

  getEvent(eventName) {
    return this.events.find(({ name }) => name === eventName)
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
   * @param eventName {string}
   * @param handler {function}
   * @param priority {string|number}
   * @returns {{ event: *, handler: * }}
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
   * @param eventName {string}
   * @param handler {function}
   * @param priority {string|number}
   * @returns {{ event: *, handlerWrapper: (function(...[*])) }}
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

export {
  EVENT_PREFIX,
  EventAggregator,
}
