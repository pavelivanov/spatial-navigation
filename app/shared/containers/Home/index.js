import React from 'react'

import CSSModules from 'react-css-modules'
import style from './style'

import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'


@CSSModules(style)
export default class Home extends React.Component {
  render() {
    return (
      <div styleName="wrapper">
        <Sidebar />
        <div styleName="container">
          <Header />
          <Content />
        </div>
      </div>
    )
  }
}
