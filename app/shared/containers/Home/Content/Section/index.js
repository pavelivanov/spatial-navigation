import React from 'react'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Item from './Item'


const sectionHeight = 100
const spaceBetweenSections = 10

@SNReact.Decorators.Element()
@CSSModules(style)
export default class ContentSection extends React.Component {
  render() {
    const { index } = this.props

    const styles = {
      transform: `translateY(${index * (sectionHeight + spaceBetweenSections)}px) translateZ(0px) translateX(0%) scale(1)`
    }

    return (
      <div styleName="section" style={styles}>
        {
          Array.apply(null, { length: 25 }).map(Number.call, Number).map((index) => (
            <Item key={index} index={index} disabled={!Boolean((index + 1) % 5)} />
          ))
        }
      </div>
    )
  }
}
