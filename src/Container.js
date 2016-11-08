import EA from './EventAggregator'
import Keyboard from './Keyboard'
import ElementCollection from './ElementCollection'
import KeyMapNavigation from './KeyMapNavigation'
import { EVENT_PREFIX } from './util/constants'


class Container {
  /**
   * @param name
   * @param options
   * @returns {Container}
   */
  static create = (name, options) => new Container(name, options)

  constructor(name, { map = {}, keyBindings, autoFocus } = {}) {
    this.name         = name
    this.disabled     = false
    this.focused      = false
    this.collection   = new ElementCollection(this)
    this.leaveFor     = map // which Container will be focused on leave this Container

    if (autoFocus) {
      EA.once(`${EVENT_PREFIX}addElement`, (instance) => {
        if (instance instanceof Container ? this == instance : this == instance.getContainer()) {
          this.focus()
          return true
        }

        return false
      })
    }

    if (Boolean(keyBindings)) {
      this.bindKeyAction(keyBindings)
    }
  }

  bindKeyAction(mapping) {
    const normailizedMap = Keyboard.addToMap(mapping)

    KeyMapNavigation.addRelation(normailizedMap, this)
  }

  disable() {
    this.disabled = true
  }

  enable() {
    this.disabled = false
  }

  focus() {
    this.focused = true
    this.collection.focus()
    EA.dispatchEvent(`${EVENT_PREFIX}focusContainer`, this)
  }

  blur() {
    this.focused = false
    EA.dispatchEvent(`${EVENT_PREFIX}blurContainer`, this)
  }
}

export default Container
