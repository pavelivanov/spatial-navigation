import React from 'react'
import cx from 'classnames'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Center from 'components/Center'


const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


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
      //backgroundImage: `url(${thumbnailUrl})`
      backgroundColor: getRandomColor()
    }

    return (
      <div styleName={itemStyleName} style={styles}>
        <Center>
          <div styleName="content">{sectionIndex + index + 1}</div>
        </Center>
      </div>
    )
  }
}
