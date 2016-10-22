import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { ContainerCollection, Element, SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Center from 'components/Center'


@SNReact.Decorators.Element()
@CSSModules(style, { allowMultiple: true })
export default class ContentItem extends React.Component {

  render() {
    const { num, disabled } = this.props

    const itemStyleName = cx('item', {
      'disabled': Boolean(disabled)
    })

    return (
      <div styleName={itemStyleName}>
        <Center>
          <div styleName="content">{num}</div>
        </Center>
      </div>
    )
  }
}
