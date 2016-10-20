import EA from './EventAggregator'
import ElementCollection from './ElementCollection'
import { EVENT_PREFIX } from './util/constants'


class Container {
  static create(name, map) {
    return new this(name, map)
  }
  
  constructor(name, map) {
    this.name = name
    this.disabled = false
    this.focused = false
    this.elements = new ElementCollection(this)
    this.leaveFor = map || {} // which Container will be focused on leave this Container
    this.enterTo = 'default' // which Element will be focused on enter this Container ( first | last | default )

    this.didMount()
  }

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}userFocusElement`, ::this.onUserFocusElement)
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

    EA.dispatchEvent(`${EVENT_PREFIX}focusContainer`, this)
  }

  blur() {
    this.focused = false

    EA.dispatchEvent(`${EVENT_PREFIX}blurContainer`, this)
  }

  getContainerToNavigate(direction) {
    return this.leaveFor[direction]
  }

  getElementCollection() {
    return this.elements
  }
}

export default Container
