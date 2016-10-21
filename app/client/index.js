import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from 'routes'

import 'normalize.css/normalize.css'
import 'assets/styl/index.styl'

import Root from 'containers/Root'


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


const history = browserHistory

ReactDOM.render(
  <Root>
    <Router history={ history }>
      { routes }
    </Router>
  </Root>,
  document.getElementById('root')
)
