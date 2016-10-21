import Keyboard from './Keyboard'
import Mouse from './Mouse'
import Layout from './Layout'


class SpatialNavigation {
  constructor() {
    this.Keyboard = Keyboard
    this.Mouse = Mouse
    this.Layout = Layout
  }

  init(map, opts = {}) {
    this.Layout.init(map, opts)
  }
}

export default new SpatialNavigation
