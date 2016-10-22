/**
 * Created by gillbeits on 21/10/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Container from '../../Container'
import Element from '../../Element'


const withElement = (keyBindings = {}) => {

  return (ComposedComponent) => {

    const SNElementComponent = class extends React.Component {

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

    SNElementComponent.displayName = "SN:Element"

    return SNElementComponent

  }
}

export default withElement
