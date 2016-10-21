import React from 'react'
import SN from 'SN'

const actionToKeyMapping = {
  left: {
    keyCode: 37
  },
  up: {
    keyCode: 38
  },
  right: {
    keyCode: 39
  },
  down: {
    keyCode: 40
  },
  esc: {
    keyCode: 27
  },
  tab: {
    keyCode: 9
  }
}

SN.Keyboard.addToMap(actionToKeyMapping)

SN.init({
  'Sidebar': {
    map: {
      right: 'Content'
    },
    bind: {
      s: {
        keyCode: 83
      }
    }
  },
  'Search': {
    map: {
      left: 'Sidebar',
      down: 'Content'
    }
  },
  'Banner': {
    map: {
      up: 'Search',
      down: 'Content',
      left: 'Sidebar'
    }
  },
  'Content': {
    map: {
      up: 'Banner',
      left: 'Sidebar'
    }
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
