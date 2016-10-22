import Keyboard from './Keyboard'
import Navigation from './Navigation'
import Mouse from './Mouse'
import Layout from './Layout'


class SpatialNavigation {
  constructor() {
    this.Keyboard = Keyboard
    this.Navigation = Navigation
    this.Mouse = Mouse
    this.Layout = Layout
  }
}

export default new SpatialNavigation
