import EA from './EventAggregator'
import ElementCollection from './ElementCollection'


class Container {
  static create(name, map) {
    return new this(name, map)
  }
  
  constructor(name, map) {
    super()
    
    this.name = name
    this.focused = false
    this.elements = new ElementCollection(this)
    this.leaveFor = map || {} // which Container will be focused on leave this Container
    this.enterTo = 'default' // which Element will be focused on enter this Container ( first | last | default )

    this.didMount()
  }

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe('addElementToContainer', (containerName, element) => {
      if (this.name == containerName) {
        this.elements.push(element)
      }
    })
  }
  
  getContainerToNavigate(direction) {
    return this.leaveFor[direction]
  }
  
  focus() {
    this.focused = true

    EA.dispatchEvent('focusContainer', this)
  }

  // TODO rewrite
  unfocus() {
    this.focused = false

    EA.dispatchEvent('unfocusContainer', this)
  }

  getElementCollection() {
    return this.elements
  }
}

export default Container
