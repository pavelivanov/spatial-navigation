import Enhancer from './Enhancer'
import EA from './EventAggregator'
import Element from './Element'


class Container extends Enhancer {
  constructor(name) {
    super()
    
    this.name = name
    this.elements = []
    this.focusedElementIndex = null
    this.leaveFor = { // which Container will be focused on leave this Container
      up: null, // name of other Container
      right: null,
      down: null,
      left: null
    }
    this.enterTo = null // which Element will be focused on enter this Container ( first | last | default )
  }

  didMount() {
    
  }

  // TODO is it correct? or class Container may not have method to create instance of other class ?
  addElement(domElm) {
    const element = new Element(domElm)
    this.elements.push(element)
  }
  
  focus() {
    let element
    
    switch(this.enterTo) {
      case 'first':
        element = this.elements[0]
        break

      case 'last':
        element = this.elements[this.elements.length - 1]
        break

     default:
        element = this.elements[this.focusedElementIndex]
        break
    }
    
    element.focus()

    EA.dispatchEvent('focusContainer', this)
  }
}

export default Container
