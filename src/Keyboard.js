import EA from './EventAggregator'
import { throttle } from './util/throttle'
import { EVENT_PREFIX, EVENT_DELAY } from './util/constants'

class Keyboard {
  constructor() {
    // TODO move outside to dynamically add keys
    this.keyMapping = {
      left: {
        keyCode: 37
      },
      up: {
        keyCode: 38
      },
      right: {
        keyCode: 39
      },
      down: {
        keyCode: 40
      },
      search: {
        keyCode: 70,
        modifier: 'ctrl'
      }
    }
    this.normalizeMap = {}
    this.addToMap(this.keyMapping)
    this.didMount()
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

  addToMap(mapping) {
    for (let actionName in mapping) {
      let eventKey = Keyboard.getEventKey(mapping[actionName].keyCode, mapping[actionName].modifier)
      if (Boolean(this.normalizeMap[eventKey])) {
        throw new Error(`Keymap ${eventKey} exists with name ${this.normalizeMap[eventKey].name}. Check your map name ${actionName}`)
      }
      this.normalizeMap[eventKey] = Object.assign(mapping[actionName], { name: actionName })
    }
    console.log(this.normalizeMap)
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

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    document.addEventListener('keydown', throttle(::this.keyPress, EVENT_DELAY), false)
  }

  keyPress(event) {
    const eventKey = Keyboard.getEventKey(event.keyCode, event)

    if (
      !Boolean(eventKey in this.normalizeMap)
      || !Boolean(Keyboard.getModifier(event, this.normalizeMap[eventKey].modifier))
    ) return

    event.preventDefault()

    const actionName = this.normalizeMap[eventKey].name

    EA.dispatchEvent(`${EVENT_PREFIX}keypress`, actionName)
  }
}

export default new Keyboard
