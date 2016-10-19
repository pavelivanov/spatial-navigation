import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { ContainerCollection, Element } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Center from 'components/Center'


@CSSModules(style, { allowMultiple: true })
export default class ContainerElement extends React.Component {
  componentDidMount() {
    const { containerName } = this.props

    const element = ReactDOM.findDOMNode(this.refs.element)

    ContainerCollection.getByName(containerName).getElementCollection().add(new Element(element))
  }

  render() {
    const { num, width, height, block } = this.props

    const elementStyleName = cx('element', {
      'block': Boolean(block)
    })

    return (
      <div ref="element" styleName={elementStyleName} style={{ width, height }}>
        <Center>
          <div styleName="label">{num + 1}</div>
        </Center>
      </div>
    )
  }
}
