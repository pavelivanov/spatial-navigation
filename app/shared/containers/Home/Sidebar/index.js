import React from 'react'
import cx from 'classnames'
import { EventAggregator } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Element from 'components/Element'


@CSSModules(style, { allowMultiple: true })
export default class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      focused: false
    }
  }

  componentDidMount() {
    EventAggregator.subscribe('focusContainer', (container) => {
      if (container.name == 'Sidebar') {
        this.setState({
          focused: true
        })
      }
    })

    EventAggregator.subscribe('unfocusContainer', (container) => {
      if (container.name == 'Sidebar') {
        this.setState({
          focused: false
        })
      }
    })
  }
  
  
  render() {
    const { focused } = this.state

    const sidebarStyleName = cx('sidebar', {
      'focused': focused
    })


    return (
      <div styleName={sidebarStyleName}>
        {
          Array.apply(null, { length: 5 }).map(Number.call, Number).map((num) => (
            <Element key={num} num={num} containerName="Sidebar" block height={40} />
          ))
        }
      </div>
    )
  }
}
