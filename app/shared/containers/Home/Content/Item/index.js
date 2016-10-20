import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { ContainerCollection, Element } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Center from 'components/Center'


@CSSModules(style, { allowMultiple: true })
export default class ContentItem extends React.Component {
  componentDidMount() {
    const { containerName } = this.props

    const element = ReactDOM.findDOMNode(this.refs.element)

    ContainerCollection.getByName('Content').getElementCollection().add(new Element(element))
  }

  render() {
    const { num } = this.props

    return (
      <div ref="element" styleName="item">
        <Center>
          <div styleName="content">{num}</div>
        </Center>
      </div>
    )
  }
}
