import ContainerCollection from './ContainerCollection'


class ContainerNavigation {

  getToNavigate(currContainer, direction) {
    const containerName = currContainer.leaveFor[direction]
    const container = ContainerCollection.getByName(containerName)
    
    // TODO remove `container.collection.length` from here. Add `active` param to parent
    if (container && (container.disabled || !container.collection.length)) {
      return this.getToNavigate(container, direction)
    }

    return container
  }
}

export default new ContainerNavigation
