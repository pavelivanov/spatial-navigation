import React from 'react'
import EA from '../../EventAggregator'
import ContainerCollection from '../../ContainerCollection'
import Container from '../../Container'
import { EVENT_PREFIX } from '../../util/constants'


const withContainer = (containerName, { map = {}, keyBindings, ...settings }) => {
  return (ComposedComponent) => {

    class SNContainerComponent extends React.Component {
      static displayName = "SN:Container"

      constructor() {
        super()

        this.container = Container.create(containerName, map)

        ContainerCollection.add(this.container, containerName)

        if (Boolean(keyBindings)) {
          this.container.bindKeyAction(keyBindings)
        }

        if (Boolean(settings.startContainer)) {
          EA.once(`${EVENT_PREFIX}addElement`, (container) => {
            if (containerName == container.name) {
              container.focus()
              return true
            }

            return false
          })
        }

        this.state = {
          SNContainer: this.container
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

