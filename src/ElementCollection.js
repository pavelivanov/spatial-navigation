import Collection from './Collection'
import EA from './EventAggregator'
import { EVENT_PREFIX } from './constants'


class ElementCollection extends Collection {
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
    EA.subscribe(`${EVENT_PREFIX}focusContainer`, ::this.onContainerFocused)
    EA.subscribe(`${EVENT_PREFIX}keypress`, ::this.onNavigate, 2)
    EA.subscribe(`${EVENT_PREFIX}userFocusElement`, ::this.onFocusElement)
    EA.subscribe(`${EVENT_PREFIX}focusElement`, ::this.onFocusElement)
  }

  add(item, name) {
    item.container = this.container

    super.add(item, name)
    this.getCountInRow()
    EA.dispatchEvent(`${EVENT_PREFIX}addElement`, this.container)
  }

  onContainerFocused(container) {
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

  onFocusElement(element) {
    if (this.container != element.container) { // check element belongs to this collection
      return
    }

    this.focusedIndex = this.indexOf(element)
  }

  onNavigate(direction, dispatchedEvent) {
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

  getElementToNavigate(direction, focusedIndex = this.focusedIndex) {
    let element

    this.getCountInRow()
    this.getCurrentRowNum()

    if (direction == 'up') {
      focusedIndex = this.getPrevRowElementIndex(focusedIndex)
      element = this.getByIndex(focusedIndex)
    }
    else if (direction == 'down') {
      focusedIndex = this.getNextRowElementIndex(focusedIndex)
      element = this.getByIndex(focusedIndex)
    }
    else if (direction == 'left') {
      const isFocusedFirstInRow = this.isFocusedFirstInRow()
      element = isFocusedFirstInRow ? null : this.getByIndex(--focusedIndex)
    }
    else if (direction == 'right') {
      const isFocusedLastInRow = this.isFocusedLastInRow()
      element = isFocusedLastInRow ? null : this.getByIndex(++focusedIndex)
    }

    if (element && element.disabled) {
      return this.getElementToNavigate(direction, focusedIndex)
    }

    if (element) {
      this.focusedIndex = focusedIndex
    }

    return element
  }

  getCountInRow() {
    let count = 1
    let offsetLeft = 0

    for (let i = 1; i < this.collection.length; i++) {
      const element = this.collection[i]

      if (element.domEl.offsetLeft > offsetLeft) {
        offsetLeft = element.domEl.offsetLeft
        count++
      }
      else {
        break
      }
    }

    return this.countInRow = count
  }

  getRowCount() {
    return Math.ceil(this.length / this.countInRow)
  }

  getCurrentRowNum() {
    // ductape: if focused first element in row then this.focusedIndex % this.countInRow == 0
    this.currentRowNum = Math.ceil((this.focusedIndex + (this.isFocusedFirstInRow() ? 1 : 0)) / this.countInRow)
    return this.currentRowNum
  }

  getPrevRowElementIndex(focusedIndex = this.focusedIndex) {
    return focusedIndex - this.countInRow
  }

  getNextRowElementIndex(focusedIndex = this.focusedIndex) {
    let newElementIndex = focusedIndex + this.countInRow
    const isCurrentRowLast = this.isCurrentRowLast()

    if (newElementIndex > this.length - 1 && !isCurrentRowLast) {
      newElementIndex = this.length - 1
    }

    return newElementIndex
  }

  isCurrentRowLast() {
    return this.getRowCount() == 1 || this.getCurrentRowNum() == this.getRowCount()
  }

  isFocusedFirstInRow() {
    return !Boolean(this.focusedIndex % this.countInRow)
  }

  isFocusedLastInRow() {
    return this.focusedIndex == this.length - 1 || !Boolean((this.focusedIndex + 1) % this.countInRow)
  }
}

export default ElementCollection
