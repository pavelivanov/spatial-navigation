import Collection from './Collection'
import { EventAggregator } from './EventAggregator'


class ContainerCollection extends Collection {

  constructor() {
    super()

    this.eventAggregator = new EventAggregator()
  }
}

export default new ContainerCollection
