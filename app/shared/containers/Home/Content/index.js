import React from 'react'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Section from './Section'


@SNReact.Decorators.Container('Content', {
  map: { up: 'Search', left: 'Sidebar' },
  startContainer: true,
})
@CSSModules(style)
export default class Home extends React.Component {
  render() {
    return (
      <div styleName="content">
        {
          Array.apply(null, { length: 10 }).map(Number.call, Number).map((index) => (
            <Section key={index} index={index} disabled={!Boolean((index + 1) % 5)} />
          ))
        }
      </div>
    )
  }
}
