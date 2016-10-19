class Enhancer {
  constructor() {
    setTimeout(this.didMount.bind(this), 0)
  }

  didMount() {}
}

export default Enhancer
