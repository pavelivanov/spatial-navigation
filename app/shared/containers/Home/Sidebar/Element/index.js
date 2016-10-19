import React from 'react'
import ReactDOM from 'react-dom'

import CSSModules from 'react-css-modules'
import style from './style'

import { ContainerCollection, Element } from 'SN'


@CSSModules(style)
export default class SidebarElement extends React.Component {
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.refs.element)

    ContainerCollection.getByName('Sidebar').getElementCollection().add(new Element(element))
  }

  render() {
    const { num } = this.props

    return (
      <div ref="element" styleName="element">{num}</div>
    )
  }
}
