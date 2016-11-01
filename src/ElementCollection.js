import Collection from './Collection'
import EA, { EventAggregator } from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'
import Container from './Container'


class ElementCollection extends Collection {
  constructor(parent) {
    super()

    this.parent = parent
    this.focusedIndex = null
    this.eventAggregator = new EventAggregator()
  }

  add(item, name) {
    item.parent = this.parent
    item.parentCollection = this

    super.add(item, name)
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

  getIndex(element) {
    return this.indexOf(element)
  }

  setFocusedIndex(element) {
    this.focusedIndex = this.getIndex(element)
  }
}

export default ElementCollection
