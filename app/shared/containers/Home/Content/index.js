import React from 'react'

import CSSModules from 'react-css-modules'
import style from './style'

import Item from './Item'


@CSSModules(style)
export default class Home extends React.Component {
  render() {
    return (
      <div styleName="content">
        <div styleName="items">
          {
            Array.apply(null, { length: 25 }).map(Number.call, Number).map((num) => (
              <Item key={num} num={num} disabled={!Boolean((num + 1) % 5)} />
            ))
          }
        </div>
      </div>
    )
  }
}
