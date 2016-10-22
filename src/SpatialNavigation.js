import Keyboard from './Keyboard'
import Mouse from './Mouse'
import Layout from './Layout'


class SpatialNavigation {
  constructor() {
    this.Keyboard = Keyboard
    this.Mouse = Mouse
    this.Layout = Layout
  }
}

export default new SpatialNavigation
