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
    const { sectionIndex, index, disabled } = this.props
    const { thumbnailUrl } = this.props

    const itemStyleName = cx('item', {
      'disabled': Boolean(disabled)
    })

    const styles = {
      backgroundImage: `url(${thumbnailUrl})`
    }

    return (
      <div styleName={itemStyleName} style={styles}>
        <Center>
          <div styleName="content"></div>
        </Center>
      </div>
    )
  }
}
