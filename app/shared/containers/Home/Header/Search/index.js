import React from 'react'
import Icon from 'react-fa'
import { ContainerCollection, Element, ConnectItem, SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'


@SNReact.Decorators.Element({ search: { keyCode: 70, modifier: 'ctrl' }, f: { keyCode: 70 } } )
@CSSModules(style)
export default class HeaderSearch extends React.Component {
  render() {
    return (
      <div styleName="search">
        <Icon styleName="icon" name="search" />
        <input placeholder="Search" />
      </div>
    )
  }
}
