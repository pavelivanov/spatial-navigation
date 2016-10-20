class Mouse {
  constructor() {
    this.bindListeners()
  }

  preventDefault(event) {
    event.preventDefault()
  }

  bindListeners() {
    document.addEventListener('mousedown', this.preventDefault)
    document.addEventListener('mouseup', this.preventDefault)
    document.addEventListener('click', this.preventDefault)
    document.addEventListener('dblclick', this.preventDefault)
  }
}

export default new Mouse
