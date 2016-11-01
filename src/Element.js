import EA from './EventAggregator'
import ElementCollection from './ElementCollection'
import KeyMapNavigation from './KeyMapNavigation'
import Container from './Container'
import Keyboard from './Keyboard'
import Navigation from './Navigation'
import { EVENT_PREFIX } from './util/constants'


class Element {
  static create(domEl) {
    return new this(domEl)
  }

  constructor(domEl) {
    this.domEl = domEl || null
    this.disabled = false
    /**
     * @type {null|Container|Element}
     */
    this.parent = null
    this.collection = null

    if (domEl) {
      this.connectDomEl(domEl)
    }
  }

  connectDomEl(domEl) {
    this.domEl = domEl
    this.designDomEl()
    this.bindListeners()
  }

  designDomEl() {
    this.domEl.setAttribute('tabindex', '-1')
    this.domEl.style.outline = 'none'
  }

  bindListeners() {
    this.domEl.addEventListener('click', ::this.onUserClick)
  }

  unbindListeners() {
    this.domEl.removeEventListener('click', ::this.onUserClick)
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
    // going inside
    if (Boolean(this.collection)) {
      this.collection.focus()
    }
    // going outside
    else {
      this.domEl.focus()
      this.parentCollection.setFocusedIndex(this)
      
      if (this.parent instanceof Element) {
        this.parent.parentCollection.setFocusedIndex(this.parent)
      }

      if (Navigation.focusedElement) {
        const focusedContainer = Navigation.focusedElement.getContainer()
        if (focusedContainer != this.getContainer()) {
          focusedContainer.blur()
        }
      }

      // used in Navigation to set focusedElement
      EA.dispatchEvent(`${EVENT_PREFIX}focusElement`, this)
    }
  }

  onUserClick(event) {
    event.stopPropagation()

    if (this.disabled) {
      return
    }

    Navigation.focusInstance(this)
  }

  blur() {
    this.domEl.blur()
    EA.dispatchEvent(`${EVENT_PREFIX}blurElement`, this)
  }

  getCollection() {
    if (!Boolean(this.collection)) {
      this.collection = new ElementCollection(this)
    }

    return this.collection
  }

  getContainer(parent = this.parent) {
    if (!parent || !Boolean(parent instanceof Container)) {
      return this.getContainer(parent.parent)
    }

    return parent
  }

  destroy() {
    this.unbindListeners()
  }
}

export default Element
