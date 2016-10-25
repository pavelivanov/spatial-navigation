import EA from './EventAggregator'
import Logger from './Logger'
import { EVENT_PREFIX, EVENT_DELAY } from './util/constants'


class Keyboard {
  constructor() {
    this.actionToKeyMapping = {}
    this.normalizeMap = {}
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
    
    if (modifier instanceof KeyboardEvent) {
      if ((window.navigator.platform.match(/^Mac/) ? modifier.metaKey : modifier.ctrlKey)) {
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

  addToMap(mapping = {}) {
    for (let actionName in mapping) {
      const eventKey = Keyboard.getEventKey(mapping[actionName].keyCode, mapping[actionName].modifier)
      
      if (Boolean(eventKey in this.normalizeMap)) {
        console.warn(`Keymap ${eventKey} exists with name ${this.normalizeMap[eventKey].name}. Check your map name ${actionName}`)
        continue
      }

      this.normalizeMap[eventKey] = { ...mapping[actionName], name: actionName }
    }
    
    this.actionToKeyMapping = { ...this.actionToKeyMapping, ...mapping }
  }

  /**
   * @static
   * @param {KeyboardEvent} event
   * @param {string} modifier
   */
  static getModifier(event, modifier) {
    switch (modifier) {
      case 'ctrl':
        return (window.navigator.platform.match(/^Mac/) ? event.metaKey : event.ctrlKey)
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
      
      if (id != eventKey || eventKey.match(/\|/)) {
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
    //Logger.debug(eventKey)

    if (
      !Boolean(eventKey in this.normalizeMap)
      || !Boolean(Keyboard.getModifier(event, this.normalizeMap[eventKey].modifier))
    ) {
      return true
    }

    event.preventDefault()

    const actionName = this.normalizeMap[eventKey].name

    // TODO add Array.prototype.find, check it in old browsers, add polyfill
    if (~[ 'up', 'down', 'left', 'right' ].indexOf(actionName)) {
      EA.dispatchEvent(`${EVENT_PREFIX}navigate`, actionName)
    }
    EA.dispatchEvent(`${EVENT_PREFIX}keypress`, actionName)
    EA.dispatchEvent(`${EVENT_PREFIX}${actionName}`)

    return true
  }
}

export default new Keyboard
