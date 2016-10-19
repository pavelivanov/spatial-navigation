class Collection {
  constructor() {
    this.collection = []
    this.collectionIds = null
  }

  add(item, name) {
    this.collection.push(item)
    if (name) {
      if (!this.collectionIds) {
        this.collectionIds = {}
      }
      this.collectionIds[name] = this.collection.length - 1
    }
  }

  indexOf(item) {
    return this.collection.indexOf(item)
  }

  getByIndex(index) {
    return this.collection[index]
  }

  getByName(name) {
    return this.collection[this.collectionIds[name]]
  }

  get length() {
    return this.collection.length
  }
}

export default Collection
