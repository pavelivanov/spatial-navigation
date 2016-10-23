import React from 'react'
import cx from 'classnames'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Center from 'components/Center'


function ColorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return ColorLuminance(color, -0.25);
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
