//import Element from './Element'
//import Container from './Container'


class Collection {

  constructor() {
    this.items = []
    this.itemIds = {}
  }

  add(item, name) {
    this.push(item)

    if (item.constructor.name === 'Element') {
      return item
    }

    //if (item.constructor.name === 'Container' && !name) {
    if (item.constructor.name === 'Container' && !name) {
      throw Error('You must pass name of item you try add to Collection')
    }

    if (!this.itemIds) {
      this.itemIds = {}
    }

    if (name in this.itemIds) {
      console.warn(`Item with name "${name}" already exists in Collection`)
    }

    this.itemIds[name] = this.items.length - 1

    return item
  }
  
  unshift(item) {
    this.items.unshift(item)

    return item
  }
  
  push(item) {
    this.items.push(item)

    return item
  }

  indexOf(item) {
    return this.items.indexOf(item)
  }

  getByIndex(index) {
    return this.items[index]
  }

  /**
   *
   * @param name
   * @returns {*}
   */
  getByName(name) {
    return this.items[this.itemIds[name]]
  }

  isExists(name) {
    return Boolean(this.getByName(name))
  }

  get length() {
    return this.items.length
  }
}

export default Collection
