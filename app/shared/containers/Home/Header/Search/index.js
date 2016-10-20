import React from 'react'
import ReactDOM from 'react-dom'
import Icon from 'react-fa'
import { ContainerCollection, Element } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'


@CSSModules(style)
export default class HeaderSearch extends React.Component {
  componentDidMount() {
    const { containerName } = this.props

    const element = ReactDOM.findDOMNode(this.refs.input)

    ContainerCollection.getByName('Search').getElementCollection().add(new Element(element))
  }

  render() {
    return (
      <div ref="input" styleName="search">
        <Icon styleName="icon" name="search" />
        <input placeholder="Search" />
      </div>
    )
  }
}
