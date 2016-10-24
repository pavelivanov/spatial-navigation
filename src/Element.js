import EA from './EventAggregator'
import { ContainerCollection } from './ContainerCollection'
import ElementCollection from './ElementCollection'
import Container from './Container'
import Keyboard from './Keyboard'
import Navigation from './Navigation'
import { EVENT_PREFIX } from './util/constants'


class Element {
  static create(domEl) {
    return new this(domEl)
  }

  constructor() {
    this.domEl = null
    this.disabled = false
    /**
     * @type {null|Container}
     */
    this.parent = null
    this.collection = null
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

  bindKeyAction(mapping) {
    Keyboard.addToMap(mapping)

    EA.subscribe(`${EVENT_PREFIX}keypress`, (actionName) => {
      // TODO remove `getFocusedContainer`
      const focusedContainer = ContainerCollection.getFocusedContainer()

      if (!Boolean(actionName in mapping)) {
        return
      }

      if (this.parent != focusedContainer) {
        const { event, handler } = EA.subscribe(`${EVENT_PREFIX}esc`, () => {
          if (this.parent.focused) {
            focusedContainer.focus()
          }
        })

        EA.once(`${EVENT_PREFIX}blurContainer`, (parent) => {
          if (this.parent == parent) {
            event.removeHandler(handler)
            return true
          }
        })

        this.focus()
      }
    })

    return this
  }

  unbindListeners() {
    this.domEl.removeEventListener('click', ::this.onUserClick)
  }

  disable() {
    this.disabled = true
  }

  enable() {
    this.disabled = false
  }

  focus() {
    if (Boolean(this.collection)) {
      this.collection.focus()
    }
    else {
      this.domEl.focus()
      // TODO recursively set focusedIndex for all parents of this element
      if (this.parent) {
        this.setFocusedIndexForAllParents(this)
      }
      EA.dispatchEvent(`${EVENT_PREFIX}focusElement`, this)
    }
  }

  onUserClick(event) {
    event.stopPropagation()

    if (this.disabled) {
      return
    }

    Navigation.focusInstance(this)
    //EA.dispatchEvent(`${EVENT_PREFIX}userFocusElement`, this)
  }

  // TODO rewrite this! use `belongs to` in all tree
  setFocusedIndexForAllParents(element) {
    if (!element.parent) {
      ContainerCollection.setFocusedContainer(element)
      return
    }

    element.parent.collection.setFocusedIndex(element)

    this.setFocusedIndexForAllParents(element.parent)
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

  destroy() {
    this.unbindListeners()
  }
}

export default Element
