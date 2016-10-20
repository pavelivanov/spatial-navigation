import React from 'react'

import CSSModules from 'react-css-modules'
import style from './style'

import Search from './Search'


@CSSModules(style)
export default class Header extends React.Component {
  render() {
    return (
      <div styleName="header">
        <Search />
      </div>
    )
  }
}
