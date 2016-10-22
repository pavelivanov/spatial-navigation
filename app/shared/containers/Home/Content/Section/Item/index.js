import React from 'react'
import cx from 'classnames'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Center from 'components/Center'


@SNReact.Decorators.Element()
@CSSModules(style, { allowMultiple: true })
export default class ContentSectionItem extends React.Component {
  render() {
    const { index, disabled } = this.props

    const itemStyleName = cx('item', {
      'disabled': Boolean(disabled)
    })

    return (
      <div styleName={itemStyleName}>
        <Center>
          <div styleName="content">{index + 1}</div>
        </Center>
      </div>
    )
  }
}
