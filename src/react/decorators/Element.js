import React from 'react'
import ReactDOM from 'react-dom'
import Container from '../../Container'
import Element from '../../Element'


const withElement = ({ keyBindings = {} } = {}) => {
  return (ComposedComponent) => {

    class SNElementComponent extends React.Component {
      static displayName = "SN:Element"

      static contextTypes = {
        container: React.PropTypes.instanceOf(Container),
        element: React.PropTypes.instanceOf(Element),
      }
      
      constructor() {
        super()

        this.element = new Element

        this.state = {
          SNElement: this.element
        }
      }

      handleChildRef = (component) => {
        if (!component) {
          return
        }

        const { state, props } = component

        const ctxParent = this.context.element || this.context.container
        const domEl = ReactDOM.findDOMNode(component)

        this.element.connectDomEl(domEl)
        this.element.bindKeyAction(keyBindings)

        const disabled = state && state.disabled || props && props.disabled
        if (disabled) {
          this.element.disable()
        }

        ctxParent.getCollection().add(this.element)
      }

      getChildContext() {
        return {
          element: this.element,
        }
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

    SNElementComponent.childContextTypes = {
      element: React.PropTypes.instanceOf(Element)
    }

    return SNElementComponent
  }
}

export default withElement
