import EA from './EventAggregator'
import Keyboard from './Keyboard'
import ElementCollection from './ElementCollection'
import KeyMapNavigation from './KeyMapNavigation'
import { EVENT_PREFIX } from './util/constants'


class Container {
  /**
   *
   * @param name
   * @param options
   * @returns {Container}
   */
  static create = (name, options) => new Container(name, options)

  constructor(name, { map = {}, keyBindings, startContainer }) {
    this.name         = name
    this.disabled     = false
    this.focused      = false
    this.collection   = new ElementCollection(this)
    this.leaveFor     = map // which Container will be focused on leave this Container
    this.enterTo      = 'default' // which Element will be focused on enter this Container ( first | last | default )

    if (startContainer) {
      // TODO what if no one element added at the start, but aftem time will be added?
      // TODO need to rework this and focus only on init
      EA.once(`${EVENT_PREFIX}addElement`, (container) => {
        if (container == this) {
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

  getCollection() {
    return this.collection
  }
}

export default Container
