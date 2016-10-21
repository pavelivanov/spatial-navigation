/*
 Decorator [ Experimental ]
 */

import React from 'react'
import ReactDOM from 'react-dom'
import hoistStatics from 'hoist-non-react-statics'
import ContainerCollection from '../ContainerCollection'
import Element from '../Element'


function decorateHandler (DecoratedComponent, containerName, keyBindings) {
	class Wrapper extends React.Component {
    handleChildRef = (component) => {
      const container = ContainerCollection.getByName(containerName)
      const domEl = ReactDOM.findDOMNode(component)
      const element = new Element(domEl)

      element.bindKeyAction(keyBindings)

      container.getElementCollection().add(element)
    }

    render() {
      return (
        <DecoratedComponent
          {...this.props}
          {...this.state}
          ref={this.handleChildRef}
        />
      )
    }
  }

  return hoistStatics(Wrapper, DecoratedComponent)
}

export default function ConnectElement (...opts) {
  return function decorateTarget(DecoratedComponent) {
    return decorateHandler(DecoratedComponent, ...opts)
  }
}
