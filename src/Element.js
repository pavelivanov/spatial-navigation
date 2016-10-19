import EA from './EventAggregator'


class Element {
  static create(domEl) {
    return new this(domEl)
  }
  
  constructor(domEl) {
    super()

    this.domEl = domEl
    this.disabled = false

    this.didMount()
  }
  
  didMount() {
    this.domEl.setAttribute('tabindex', '-1')
  }

  disable() {
    this.disabled = true
  }
  
  enable() {
    this.disabled = false
  }
  
  focus() {
    this.domEl.focus()

    EA.dispatchEvent('focusElement', this)
  }

  blur() {
    this.domEl.blur()

    EA.dispatchEvent('blurElement', this)
  }
}

export default Element
