import EA from './EventAggregator'
import ElementCollection from './ElementCollection'
import KeyMapNavigation from './KeyMapNavigation'
import Container from './Container'
import Keyboard from './Keyboard'
import Navigation from './Navigation'
import { EVENT_PREFIX } from './util/constants'


class Element {

  /**
   * @param domEl
   * @param settings
   */
  static create = (domEl, settings) => new Element(domEl, settings)

  // TODO wtf is hasCollection here?
  // TODO wtf is collectionSettings here? It never used in ElementCollection!
  constructor(domEl, { keyBindings, autoFocus, hasCollection, collectionSettings } = {}) {
    this.domEl = domEl || null
    this.disabled = false
    /**
     * @type {null|Container|Element}
     */
    this.parent = null
    // TODO wtf is hasCollection here?
    // TODO if there is Boolean when condition is wrong!
    this.collection = hasCollection || collectionSettings ? new ElementCollection(this, collectionSettings) : null

    if (domEl) {
      this.connectDomEl(domEl)
    }

    if (keyBindings) {
      this.bindKeyAction(keyBindings)
    }

    if (autoFocus) {
      if (this.collection) {
        this.collection.eventAggregator.once(`${EVENT_PREFIX}addElement`, (element) => {
          if (element === this) {
            this.focus()
            return true
          }
          return false
        })
      }
      else {
        this.focus()
      }
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
      this.parent.collection.setFocusedIndex(this)

      if (this.parent.constructor.name === 'Element') {
        this.parent.parent.collection.setFocusedIndex(this.parent)
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

    if (this.disabled || Boolean(this.collection)) {
      return
    }

    Navigation.focusInstance(this)
  }

  blur() {
    this.domEl.blur()
    EA.dispatchEvent(`${EVENT_PREFIX}blurElement`, this)
  }

  getContainer(parent = this.parent) {
    if (!parent || !Boolean(parent.constructor.name === 'Container')) {
      return this.getContainer(parent.parent)
    }

    return parent
  }

  destroy() {
    this.unbindListeners()
  }
}

export default Element
