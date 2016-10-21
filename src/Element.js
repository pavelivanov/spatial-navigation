import EA from './EventAggregator'
import ContainerCollection from './ContainerCollection'
import Keyboard from './Keyboard'
import { EVENT_PREFIX } from './util/constants'


class Element {
  static create(domEl) {
    return new this(domEl)
  }
  
  constructor(domEl) {
    this.domEl = domEl
    this.disabled = false
    /**
     * @type {null|Container}
     */
    this.container = null

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
      const fucusedContainer = ContainerCollection.focusedContainer

      for (let keyAction in mapping) {
        if (keyAction == actionName && this.container != fucusedContainer) {
          const { event, handler } = EA.subscribe(`${EVENT_PREFIX}keypress`, (cancelAction) => {
            if (cancelAction == 'cancel' && this.container.focused) {
              fucusedContainer.focus()
            }
          })

          EA.once(`${EVENT_PREFIX}blurContainer`, (container) => {
            if (this.container == container) {
              event.removeHandler(handler)
              return true
            }
          })

          this.onUserFocus()
        }
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
    this.domEl.focus()

    EA.dispatchEvent(`${EVENT_PREFIX}focusElement`, this)
  }

  onUserClick() {
    if (this.disabled) {
      return
    }

    this.focus()

    EA.dispatchEvent(`${EVENT_PREFIX}userFocusElement`, this)
  }

  blur() {
    this.domEl.blur()

    EA.dispatchEvent(`${EVENT_PREFIX}blurElement`, this)
  }

  destroy() {
    this.unbindListeners()
  }
}

export default Element
