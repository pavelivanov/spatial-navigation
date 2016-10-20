import React from 'react'

import SN from 'SN'

SN.init({
  'Sidebar': {
    right: 'Content'
  },
  'Search': {
    left: 'Sidebar',
    down: 'Content'
  },
  'Content': {
    up: 'Search',
    left: 'Sidebar'
  }
}, {
  startContainerName: 'Content'
})


export default class Root extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
