import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'


class Element {
  static create(domEl) {
    return new this(domEl)
  }
  
  constructor(domEl) {
    this.domEl = domEl
    this.disabled = false

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
