import EA from './EventAggregator'
import { EVENT_PREFIX, EVENT_DELAY } from './util/constants'


class Keyboard {

  constructor() {
    this.normalizedMap = {}
    this.bindListeners()
  }

  /**
   *
   * @param keyCode
   * @param {string|KeyboardEvent} modifier - cmdKey, ctrlKey
   * @returns {string}
   */
  static getEventKey(keyCode, modifier) {
    const key = [ keyCode ]

    if (modifier && modifier.constructor.name === 'KeyboardEvent') {
      if (modifier.metaKey) {
        key.push('meta')
      }
      else if (modifier.ctrlKey) {
        key.push('ctrl')
      }
      else if (modifier.shiftKey) {
        key.push('shift')
      }
      else if (modifier.altKey) {
        key.push('alt')
      }
    }
    else if (Boolean(modifier)) {
      key.push(modifier)
    }
    
    return key.join('|')
  }

  /**
   *
   * @param mapping {Array|Object}
   * @returns {{}}
   */
  addToMap(mapping) {
    const normalizedMap = {}

    if (!Boolean(mapping.constructor.name === 'Array')) {
      mapping = [ mapping ]
    }

    mapping.forEach((map) => {
      // TODO map doesn't contain modifier, so there is error in getEventKey
      const eventKey = Keyboard.getEventKey(map.keyCode, map.modifier)

      if (Boolean(eventKey in this.normalizedMap)) {
        console.warn(`Keymap ${eventKey} already exists`)
      }

      this.normalizedMap[eventKey] = map
      normalizedMap[eventKey] = map
    })

    return normalizedMap
  }

  /**
   * @static
   * @param {KeyboardEvent} event
   * @param {string} modifier
   */
  static getModifier(event, modifier) {
    switch (modifier) {
      case 'meta':
        return event.metaKey
      case 'ctrl':
        return event.ctrlKey
      case 'shift':
        return event.shiftKey
      case 'alt':
        return event.altKey
      default:
        return true
    }
  }

  static throttle = (func, threshold) => {
    let id = null
    let isThrottled = false
    let callTimer

    const clearVariables = () => {
      id = null
      isThrottled = false
    }

    /**
     * @param {KeyboardEvent} event
     */
    const wrapper = function (event) {
      const eventKey = Keyboard.getEventKey(event.keyCode, event)
      
      if (id !== eventKey || eventKey.match(/\|/)) {
        func.call(this, event)
        id = eventKey
      }

      if (!isThrottled) {
        isThrottled = true

        callTimer = setTimeout(() => {
          isThrottled = !func.call(this, event)
        }, threshold)
      }
    }

    wrapper.__proto__.finish = () => {
      clearVariables()
      clearTimeout(callTimer)
    }

    return wrapper
  }

  bindListeners() {
    const thr = Keyboard.throttle(::this.keyPress, EVENT_DELAY)

    window.addEventListener('keydown', thr)
    window.addEventListener('keyup', thr.finish)
  }

  /**
   *
   * @param {KeyboardEvent} event
   * @returns {boolean}
   */
  keyPress(event) {
    const eventKey = Keyboard.getEventKey(event.keyCode, event)

    if (
      !Boolean(eventKey in this.normalizedMap)
      // this condition need for `throttle` method. If press `ctrl + F`, key up `F` throttling continue
      || !Boolean(Keyboard.getModifier(event, this.normalizedMap[eventKey].modifier))
    ) {
      return true
    }

    event.preventDefault()

    EA.dispatchEvent(`${EVENT_PREFIX}keypress`, eventKey)

    const eventName = this.normalizedMap[eventKey].name
    if (Boolean(eventName)) {
      EA.dispatchEvent(`${EVENT_PREFIX}navigate`, eventName)
      EA.dispatchEvent(`${EVENT_PREFIX}${eventName}`)
    }

    return true
  }
}

export default new Keyboard
