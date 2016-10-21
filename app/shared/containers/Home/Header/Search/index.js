import React from 'react'
import ReactDOM from 'react-dom'
import Icon from 'react-fa'
import { ContainerCollection, Element } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'


@CSSModules(style)
export default class HeaderSearch extends React.Component {
  componentDidMount() {
    const reactElement = ReactDOM.findDOMNode(this.refs.input)
    const element = new Element(reactElement)

    element.bindKeyAction({
      search: {
        keyCode: 70,
        modifier: 'ctrl'
      },
      f: {
        keyCode: 70
      }
    })
    
    ContainerCollection.getByName('Search').getElementCollection().add(element)
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
