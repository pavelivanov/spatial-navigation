import EA from './EventAggregator'


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

    EA.dispatchEvent('si:focusElement', this)
  }

  onUserFocus() {
    this.focus()

    EA.dispatchEvent('si:userFocusElement', this)
  }

  blur() {
    this.domEl.blur()

    EA.dispatchEvent('si:blurElement', this)
  }

  destroy() {
    this.unbindListeners()
  }
}

export default Element
