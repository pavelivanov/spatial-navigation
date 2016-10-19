import Collection from './Collection'
import Element from './Element'
import EA from './EventAggregator'


class ElementCollection extends Collection {
  constructor(container) {
    super()

    this.container = container
    this.focusedIndex = null

    this.didMount()
  }

  static addElementToContainer(containerName, domEl) {
    const element = new Element(domEl)
    
    EA.dispatchEvent('addElementToContainer', containerName, element)
  }

  didMount() {
    this.bindListeners()
  }

  add(item, name) {
    super.add(item, name)
    EA.dispatchEvent('addElement', this.container)
  }

  bindListeners() {
    EA.subscribe('focusContainer', (container) => {
      if (this.container != container) {
        return
      }

      if (!Boolean(this.length)) {
        return
      }

      let elementIndex

      if (this.focusedIndex == null) {
        this.focusedIndex = elementIndex = 0
      }
      else {
        switch(this.enterTo) {
          case 'first':
            elementIndex = 0
            break

          case 'last':
            elementIndex = this.length - 1
            break

          default:
            elementIndex = this.focusedIndex
            break
        }
      }

      const element = this.getByIndex(elementIndex)

      element.focus()
    })

    EA.subscribe('navigate', (direction, dispatchedEvent) => {
      if (!this.container.focused) {
        return
      }

      if (!Boolean(this.length)) {
        return
      }

      const navigateToElement = this.getElementToNavigate(direction)

      if (navigateToElement) {
        dispatchedEvent.stopPropagation()
        navigateToElement.focus()
      }
    }, 2)
  }

  getElementToNavigate(direction) {
    let element

    switch(direction) {
      case 'up':

        break

      case 'down':

        break

      case 'left':
        element = this.getByIndex(this.focusedIndex - 1)
        if (element) {
          this.focusedIndex = --this.focusedIndex
        }
        break

      case 'right':
        element = this.getByIndex(this.focusedIndex + 1)
        if (element) {
          this.focusedIndex = ++this.focusedIndex
        }
        break
    }

    return element
  }

  getFocusedElement() {
    return this.getByIndex(this.focusedIndex)
  }

  isFocusedElementFirst() {
    return this.focusedIndex == 0
  }

  isFocusedElementLast() {
    return this.focusedIndex == this.length
  }
}

export default ElementCollection
