/**
 * Created by gillbeits on 21/10/2016.
 */
import React from 'react'
import ContainerCollection from '../../ContainerCollection'
import Container from '../../Container'


const withContainer = (containerName, keyBindings = {}) => {
  return (ComposedComponent) => {

    const SNContainerComponent = class extends React.Component {

      static displayName = "SN:Container"

      constructor() {
        super()
        if (ContainerCollection.isExists(containerName)) {
          /**
           * @type {Container}
           * @private
           */
          this.container = ContainerCollection.getByName(containerName)

          if (Boolean(this.container) && Boolean(keyBindings)) {
            this.container.bindKeyAction(keyBindings)
          }
        }
      }

      getChildContext() {
        return {
            container: this.container,
        }
      }

      render() {
        return(
          <ComposedComponent
            {...this.props}
            {...this.state}
          />
        )
      }
    }

    SNContainerComponent.childContextTypes = {
      container: React.PropTypes.instanceOf(Container).isRequired
    }

    return SNContainerComponent
  }
}

export default withContainer

