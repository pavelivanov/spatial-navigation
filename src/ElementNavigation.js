class ElementNavigation {
  constructor() {
    
  }

  getToNavigate(currElement, direction) {
    let element

    const countInRow = this.getCountInRow(currElement.parentCollection)
    let currIndex = currElement.parentCollection.getIndex(currElement)

    switch (direction) {
      case 'up':
      case 'down':
        if (direction == 'up') {
          element = currElement.parentCollection.getByIndex(currIndex - countInRow)
        }
        else {
          // MAGIC!
          let nextIndex = currIndex + countInRow
          const maxCountInCollection = Math.ceil(currElement.parentCollection.length / countInRow)
          const lastElementIndex = currElement.parentCollection.length - 1

          if (nextIndex > lastElementIndex && nextIndex < maxCountInCollection) {
            nextIndex = lastElementIndex
          }

          element = currElement.parentCollection.getByIndex(nextIndex)
        }
        break

      case 'left':
        if (currIndex % countInRow != 0) {
          element = currElement.parentCollection.getByIndex(--currIndex)
        }
        break

      case 'right':
        if ((currIndex + 1) % countInRow != 0) {
          element = currElement.parentCollection.getByIndex(++currIndex)
        }
        break
    }

    if (element && element.disabled) {
      return this.getToNavigate(element, direction)
    }

    return element
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