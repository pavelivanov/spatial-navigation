import Enhancer from './Enhancer'
import EA from './EventAggregator'


class Element extends Enhancer {
  constructor(domEl) {
    super()

    this.domEl = domEl
    this.disabled = false
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
}

export default Element
