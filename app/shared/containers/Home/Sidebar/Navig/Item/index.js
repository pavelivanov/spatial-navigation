import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import cx from 'classnames'
import Icon from 'react-fa'
import { ContainerCollection, Element, SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Center from 'components/Center'

@SNReact.Decorators.Element()
@CSSModules(style, { allowMultiple: true })
export default class SidebarNavigItem extends React.Component {
  render() {
    const { title, link, icon } = this.props

    return (
      <div ref="element" styleName="item">
        <Icon styleName="icon" name={icon} />
        <span styleName="title">{title}</span>
      </div>
    )
  }
}
