import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'


class Element {
  static create(domEl) {
    return new this(domEl)
  }
  
  constructor(domEl) {
    this.domEl = domEl
    this.disabled = false

    this.didMount()
  }
  
  didMount() {
    this.domEl.setAttribute('tabindex', '-1')
    this.domEl.style.outline = 'none'
    this.bindListeners()
  }

  bindListeners() {
    this.domEl.addEventListener('click', ::this.onUserFocus)
  }

  unbindListeners() {
    this.domEl.removeEventListener('click', ::this.onUserFocus)
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

  onUserFocus() {
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
