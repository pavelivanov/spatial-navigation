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
  constructor(props) {
    super()

    this.state = {
      focusedSectionIndex: 0,
    }

    props.SNContainer.collection.eventAggregator.subscribe('navigate', () => {
      this.setState({
        focusedSectionIndex: props.SNContainer.collection.focusedIndex
      })
    })
  }

  render() {
    const { focusedSectionIndex } = this.state

    return (
      <div styleName="content">
        {
          Array.apply(null, { length: 10 }).map(Number.call, Number).map((index) => (
            <Section key={index} index={index} focusedSectionIndex={focusedSectionIndex} />
          ))
        }
      </div>
    )
  }
}
