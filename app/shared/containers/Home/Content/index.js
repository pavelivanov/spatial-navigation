import React from 'react'

import CSSModules from 'react-css-modules'
import style from './style'

import Element from 'components/Element'


@CSSModules(style)
export default class Home extends React.Component {
  render() {
    return (
      <div styleName="content">
        {
          Array.apply(null, { length: 25 }).map(Number.call, Number).map((num) => (
            <Element key={num} num={num} width={100} height={100} />
          ))
        }
      </div>
    )
  }
}
