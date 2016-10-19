import Collection from './Collection'
import Element from './Element'
import EA from './EventAggregator'


class ElementCollection extends Collection {
  static addElementToContainer(containerName, domEl) {
    const element = new Element(domEl)

    EA.dispatchEvent('addElementToContainer', containerName, element)
  }

  constructor(container) {
    super()

    this.container = container
    this.focusedIndex = null
    this.countInRow = null
    this.currentRowNum = 0

    this.didMount()
  }

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe('focusContainer', this.focus.bind(this))
    EA.subscribe('navigate', this.navigate.bind(this), 2)
  }

  add(item, name) {
    super.add(item, name)
    this.getCountInRow()
    EA.dispatchEvent('addElement', this.container)
  }

  focus(container) {
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
  }

  navigate(direction, dispatchedEvent) {
    if (!this.container.focused) { // check if dispatched this container
      return
    }

    if (!Boolean(this.length)) { // check if there are elements in container
      return
    }

    const elementToNavigate = this.getElementToNavigate(direction)

    if (elementToNavigate) {
      dispatchedEvent.stopPropagation()
      elementToNavigate.focus()
    }
  }

  getElementToNavigate(direction) {
    let element

    this.getCountInRow()
    this.getCurrentRowNum()

    if (direction == 'up') {
      const newElementIndex = this.getPrevRowElementIndex()
      element = this.getByIndex(newElementIndex)

      if (element) {
        this.focusedIndex = newElementIndex
      }
    }
    else if (direction == 'down') {
      const newElementIndex = this.getNextRowElementIndex()
      element = this.getByIndex(newElementIndex)

      if (element) {
        this.focusedIndex = newElementIndex
      }
    }
    else if (direction == 'left') {
      const isFocusedFirstInRow = this.isFocusedFirstInRow()
      element = isFocusedFirstInRow ? null : this.getByIndex(this.focusedIndex - 1)

      if (element) {
        this.focusedIndex = --this.focusedIndex
      }
    }
    else if (direction == 'right') {
      const isFocusedLastInRow = this.isFocusedLastInRow()
      element = isFocusedLastInRow ? null : this.getByIndex(this.focusedIndex + 1)

      if (element) {
        this.focusedIndex = ++this.focusedIndex
      }
    }

    return element
  }

  getCountInRow() {
    let count = 0
    let offsetLeft = 0

    if (this.length == 0) {
      count = 1
    }
    else {
      for (let i = 0; i < this.collection.length; i++) {
        const element = this.collection[i]

        if (element.domEl.offsetLeft > offsetLeft) {
          offsetLeft = element.domEl.offsetLeft
          count++
        }
        else {
          break
        }
      }
    }

    this.countInRow = count
  }

  getCurrentRowNum() {
    this.currentRowNum = Math.ceil(this.focusedIndex / this.countInRow)
    return this.currentRowNum
  }

  getPrevRowElementIndex() {
    return this.focusedIndex - this.countInRow
  }

  getNextRowElementIndex() {
    let newElementIndex = this.focusedIndex + this.countInRow
    const isCurrentRowLast = this.isCurrentRowLast()

    if (newElementIndex > this.length - 1 && !isCurrentRowLast) {
      newElementIndex = this.length - 1
    }

    return newElementIndex
  }

  isCurrentRowLast() {
    return this.getCurrentRowNum() == Math.ceil(this.length / this.countInRow)
  }

  isFocusedFirstInRow() {
    return !Boolean(this.focusedIndex % this.countInRow)
  }

  isFocusedLastInRow() {
    return this.focusedIndex == this.length - 1 || !Boolean((this.focusedIndex + 1) % this.countInRow)
  }
}

export default ElementCollection
