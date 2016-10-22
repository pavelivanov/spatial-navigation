import Collection from './Collection'
import EA from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'
import Container from './Container'


class ElementCollection extends Collection {
  constructor(parent) {
    super()

    this.parent = parent
    this.focusedIndex = null
    this.countInRow = null
    this.currentRowNum = 0

    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}userFocusElement`, ::this.onFocusElement)
    EA.subscribe(`${EVENT_PREFIX}focusElement`, ::this.onFocusElement)
  }

  add(item, name) {
    item.parent = this.parent

    super.add(item, name)
    this.getCountInRow()
    EA.dispatchEvent(`${EVENT_PREFIX}addElement`, this.parent)
  }

  focus() {
    if (this.parent instanceof Container && !Boolean(this.length)) {
      throw Error(`You must add at least one element to each container. Check ${this.parent.name} container`)
    }

    let elementIndex

    if (this.focusedIndex == null) {
      this.focusedIndex = elementIndex = 0
    }
    else {
      switch (this.enterTo) {
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
    if (this.parent != element.parent) { // check element belongs to this collection
      return
    }

    this.focusedIndex = this.indexOf(element)
  }

  getInstanceToFocus(direction, focusedIndex = this.focusedIndex) {
    let element

    this.getCountInRow()
    this.getCurrentRowNum()

    switch (direction) {
      case 'up':
        focusedIndex = this.getPrevRowElementIndex(focusedIndex)
        element = this.getByIndex(focusedIndex)
        break

      case 'down':
        focusedIndex = this.getNextRowElementIndex(focusedIndex)
        element = this.getByIndex(focusedIndex)
        break

      case 'left':
        const isFocusedFirstInRow = this.isFocusedFirstInRow()
        element = isFocusedFirstInRow ? null : this.getByIndex(--focusedIndex)
        break

      case 'right':
        const isFocusedLastInRow = this.isFocusedLastInRow()
        element = isFocusedLastInRow ? null : this.getByIndex(++focusedIndex)
        break
    }

    if (element && element.disabled) {
      return this.getInstanceToFocus(direction, focusedIndex)
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

  getCurrentRowNum(focusedIndex = this.focusedIndex) {
    // ductape: if focused first element in row then this.focusedIndex % this.countInRow == 0
    this.currentRowNum = Math.ceil((focusedIndex + (this.isFocusedFirstInRow(focusedIndex) ? 1 : 0)) / this.countInRow)
    return this.currentRowNum
  }

  getPrevRowElementIndex(focusedIndex = this.focusedIndex) {
    return focusedIndex - this.countInRow
  }

  getNextRowElementIndex(focusedIndex = this.focusedIndex) {
    let newElementIndex = focusedIndex + this.countInRow
    const isCurrentRowLast = this.isCurrentRowLast(focusedIndex)

    if (isCurrentRowLast) {
      return null
    }
    else if (newElementIndex > this.length - 1) {
      newElementIndex = this.length - 1
    }

    return newElementIndex
  }

  isCurrentRowLast(focusedIndex = this.focusedIndex) {
    return this.getRowCount() == 1 || this.getCurrentRowNum(focusedIndex) == this.getRowCount()
  }

  isFocusedFirstInRow(focusedIndex = this.focusedIndex) {
    return !Boolean(focusedIndex % this.countInRow)
  }

  isFocusedLastInRow(focusedIndex = this.focusedIndex) {
    return focusedIndex == this.length - 1 || !Boolean((focusedIndex + 1) % this.countInRow)
  }
}

export default ElementCollection
