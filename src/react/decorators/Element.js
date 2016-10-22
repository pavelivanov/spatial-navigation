import React from 'react'
import ReactDOM from 'react-dom'
import Container from '../../Container'
import Element from '../../Element'


const withElement = ({ keyBindings = {} } = {}) => {
  return (ComposedComponent) => {

    class SNElementComponent extends React.Component {
      static displayName = "SN:Element"

      static contextTypes = {
        container: React.PropTypes.instanceOf(Container).isRequired,
      }

      handleChildRef = (component) => {
        const container = this.context.container
        const domEl = ReactDOM.findDOMNode(component)
        const element = new Element(domEl)

        element.bindKeyAction(keyBindings)
        container.getElementCollection().add(element)
      }

      render() {
        return(
          <ComposedComponent
            ref={this.handleChildRef}
            {...this.props}
            {...this.state}
          />
        )
      }
    }

    return SNElementComponent
  }
}

export default withElement
