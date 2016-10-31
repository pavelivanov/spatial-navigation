import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from 'routes'

import 'normalize.css/normalize.css'
import 'assets/styl/index.styl'

import Root from 'containers/Root'


import SN from 'SN'

const actionToKeyMapping = [
  { keyCode: 37, name: 'left' },
  { keyCode: 38, name: 'up' },
  { keyCode: 39, name: 'right' },
  { keyCode: 40, name: 'down' },
  { keyCode: 27, name: 'esc' },
]

SN.Keyboard.addToMap(actionToKeyMapping)


const history = browserHistory

ReactDOM.render(
  <Root>
    <Router history={ history }>
      { routes }
    </Router>
  </Root>,
  document.getElementById('root')
)
