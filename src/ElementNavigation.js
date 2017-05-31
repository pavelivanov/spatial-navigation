class ElementNavigation {

  getToNavigate(currElement, direction) {
    let element

    const countInRow = this.getCountInRow(currElement.parent.collection)
    let currIndex = currElement.parent.collection.getIndex(currElement)

    switch (direction) {
      case 'up':
      case 'down':
        if (direction == 'up') {
          element = currElement.parent.collection.getByIndex(currIndex - countInRow)
        }
        else {
          // MAGIC!
          let nextIndex = currIndex + countInRow
          const maxCountInCollection = Math.ceil(currElement.parent.collection.length / countInRow) * countInRow
          const lastElementIndex = currElement.parent.collection.length - 1

          if (nextIndex > lastElementIndex && nextIndex < maxCountInCollection) {
            nextIndex = lastElementIndex
          }

          element = currElement.parent.collection.getByIndex(nextIndex)
        }
        break

      case 'left':
        if (currIndex % countInRow != 0) {
          element = currElement.parent.collection.getByIndex(--currIndex)
        }
        break

      case 'right':
        if ((currIndex + 1) % countInRow != 0) {
          element = currElement.parent.collection.getByIndex(++currIndex)
        }
        break
    }

    // TODO move this from here ?
    if (
      element
      && element.parent.collection.settings
      && element.parent.collection.settings.lazy
      && element.parent.collection.settings.lazy[direction]
    ) {
      const countFromEnd = this.getCountFromEnd(element, direction)

      if (element.parent.collection.settings.lazy[direction].fromEnd == countFromEnd) {
        element.parent.collection.lazyLoad()
      }
    }

    if (element && element.disabled) {
      return this.getToNavigate(element, direction)
    }

    return element
  }

  getCountFromEnd(element, direction) {
    const countInRow          = this.getCountInRow(element.parent.collection)
    const elementIndex        = element.parent.collection.getIndex(element)
    const elementColumnIndex  = elementIndex % countInRow
    const countFromEnd        = countInRow - (elementColumnIndex + 1)

    return countFromEnd
  }

  getCountInRow(collection) {
    let count = 1
    let offsetLeft = collection.items[0].domEl.offsetLeft

    for (let i=1;;i++) {
      const element = collection.items[i]

      if (element && element.domEl.offsetLeft > offsetLeft) {
        offsetLeft = element.domEl.offsetLeft
        count++
      }
      else {
        return count
      }
    }
  }
}

export default new ElementNavigation
