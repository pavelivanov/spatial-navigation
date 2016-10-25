import React from 'react'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Section from './Section'


let prevFocusedIndex = 0
const sectionHeight = 200
const spaceBetweenSections = 20

const shiftSections = (focusedIndex) => {
  const content   = document.getElementsByClassName(style.content)[0]
  const sections  = content.children
  const direction = focusedIndex > prevFocusedIndex ? 'down' : 'up'

  if (!content.style.marginTop) {
    content.style.marginTop = '0px'
  }

  if (direction == 'down') {
    sections[prevFocusedIndex].className += ' hiddenSection'
    sections[prevFocusedIndex].style.top = parseInt(sections[prevFocusedIndex].style.top) + sectionHeight + 'px'
    content.style.marginTop = parseInt(content.style.marginTop) - (sectionHeight + spaceBetweenSections) + 'px'
  }
  else {
    sections[focusedIndex].className = sections[focusedIndex].className.replace(' hiddenSection', '')
    sections[focusedIndex].style.top = parseInt(sections[focusedIndex].style.top) - sectionHeight + 'px'
    content.style.marginTop = parseInt(content.style.marginTop) + (sectionHeight + spaceBetweenSections) + 'px'
  }

  document.body.scrollTop = 0

  prevFocusedIndex = focusedIndex
}


@SNReact.Decorators.Container('Content', {
  map: { up: 'Search', left: 'Sidebar' },
  startContainer: true,
})
@CSSModules(style)
export default class Content extends React.Component {
  sections = Array.apply(null, {length: 10}).map(() => Array.apply(null, {length: 15}).map(Number.call, Number))

  componentDidMount() {
    const { SNContainer: { collection } } = this.props

    collection.eventAggregator.subscribe('onNavigate', () => shiftSections(collection.focusedIndex))
  }

  render() {
    return (
      <div styleName="wrapper">
        <div styleName="content">
          {
            this.sections.map((items, index) => (
              <Section key={index} index={index} items={items} />
            ))
          }
        </div>
      </div>
    )
  }
}
