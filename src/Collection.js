class Collection {
  constructor() {
    this.items = []
    this.itemIds = {}
  }

  add(item, name) {
    this.items.push(item)

    if (name) {
      if (!this.itemIds) {
        this.itemIds = {}
      }

      if (Boolean(name in this.itemIds)) {
        console.warn(`Item with name "${name}" already exists in Collection`)
      }

      this.itemIds[name] = this.items.length - 1
    }

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
