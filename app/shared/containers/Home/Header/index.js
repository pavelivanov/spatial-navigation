import React from 'react'

import CSSModules from 'react-css-modules'
import style from './style'

import Element from 'components/Element'


@CSSModules(style)
export default class HeaderElement extends React.Component {
  render() {
    return (
      <div styleName="header">
        {
          Array.apply(null, { length: 3 }).map(Number.call, Number).map((num) => (
            <Element key={num} num={num} width={100} height={30} />
          ))
        }
      </div>
    )
  }
}
