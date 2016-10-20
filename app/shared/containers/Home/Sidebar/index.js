import React from 'react'
import cx from 'classnames'
import Icon from 'react-fa'
import { EventAggregator } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Navig from './Navig'


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

    EventAggregator.subscribe('blurContainer', (container) => {
      if (container.name == 'Sidebar') {
        this.setState({
          focused: false
        })
      }
    })
  }
  
  
  render() {
    const { focused } = this.state

    const sidebarClassName = cx({
      'sidebarFocused': focused
    })


    return (
      <div styleName="sidebar" className={sidebarClassName}>
        <div styleName="content">
          <div styleName="icons">
            <Icon styleName="icon" name="home" />
            <Icon styleName="icon" name="bookmark" />
            <Icon styleName="icon" name="cog" />
          </div>
        </div>
        <div styleName="wideContent">
          <Navig />
        </div>
      </div>
    )
  }
}
