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
    const { disabled } = this.props

    const item = ReactDOM.findDOMNode(this.refs.item)
    const element = new Element(item)

    if (disabled) {
      element.disable()
    }

    ContainerCollection.getByName('Content').getElementCollection().add(element)
  }

  render() {
    const { num, disabled } = this.props

    const itemStyleName = cx('item', {
      'disabled': Boolean(disabled)
    })


    return (
      <div ref="item" styleName={itemStyleName}>
        <Center>
          <div styleName="content">{num}</div>
        </Center>
      </div>
    )
  }
}
