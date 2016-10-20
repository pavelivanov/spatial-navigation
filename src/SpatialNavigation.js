import Keyboard from './Keyboard'
import Mouse from './Mouse'
import Layout from './Layout'


class SpatialNavigation {
  constructor() {
    this.keyboard = null
    this.layout = null
  }

  init(map, opts = {}) {
    this.Keyboard = Keyboard
    this.Mouse = Mouse
    this.Layout = Layout

    this.Layout.init(map, opts)
  }
}

export default new SpatialNavigation
