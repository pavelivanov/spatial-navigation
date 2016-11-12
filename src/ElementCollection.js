import Collection from './Collection'
import EA, { EventAggregator } from './EventAggregator'
import { EVENT_PREFIX } from './util/constants'
import Container from './Container'


class ElementCollection extends Collection {
  constructor(parent, settings) {
    super()

    this.parent = parent
    this.settings = settings
    this.focusedIndex = null
    this.eventAggregator = new EventAggregator()
    this.lazyLoading = false
    this.onLazyLoad = null
  }

  _extendElement(element) {
    element.parent = this.parent
    element.parentCollection = this

    //this.eventAggregator.dispatchEvent(`${EVENT_PREFIX}addElement`, item)
    //EA.dispatchEvent(`${EVENT_PREFIX}addElement`, this.parent)
  }

  unshift(element) {
    this._extendElement(element)
    super.unshift(element)
    return element
  }

  push(element) {
    this._extendElement(element)
    super.push(element)
    return element
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

  lazyLoad() {
    if (typeof this.onLazyLoad != 'function' || this.lazyLoading) {
      return
    }

    this.lazyLoading = true

    this.onLazyLoad(() => {
      this.lazyLoading = false
    })
  }

  subscribeLazyLoad(requestWrapper) {
    this.onLazyLoad = requestWrapper
  }
}

export default ElementCollection
