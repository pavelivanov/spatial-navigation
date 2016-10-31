import EA from './EventAggregator'
import Keyboard from './Keyboard'
import ElementCollection from './ElementCollection'
import KeyMapNavigation from './KeyMapNavigation'
import { EVENT_PREFIX } from './util/constants'


class Container {
  /**
   *
   * @param name
   * @param map
   * @returns {Container}
   */
  static create(name, map) {
    return new this(name, map)
  }

  constructor(name, map) {
    this.name = name
    this.disabled = false
    this.focused = false
    this.collection = new ElementCollection(this)
    this.leaveFor = map || {} // which Container will be focused on leave this Container
    this.enterTo = 'default' // which Element will be focused on enter this Container ( first | last | default )

    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}focusElement`, ::this.onUserFocusElement)
  }

  bindKeyAction(mapping) {
    const normailizedMap = Keyboard.addToMap(mapping)

    KeyMapNavigation.addRelation(normailizedMap, this)
  }

  onUserFocusElement(element) {
    if (this != element.container) {
      return
    }

    this.focused = true
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
