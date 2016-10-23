import React from 'react'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'
import contentStyle from '../style'

import Item from './Item'


const sectionHeight = 200
const spaceBetweenSections = 10

let prevFocusedIndex = 0
const itemWidth = 220
const spaceBetweenItems = 10

const shiftItems = (focusedIndex) => {
  const wrapper = document.getElementsByClassName(contentStyle.wrapper)[0]
  const section = document.getElementsByClassName(style.section)[0]
  const direction = focusedIndex > prevFocusedIndex ? 'right' : 'left'

  if (!section.style.marginLeft) {
    section.style.marginLeft = '0px'
  }

  if (direction == 'right') {
    section.style.marginLeft = parseInt(section.style.marginLeft) - (itemWidth + spaceBetweenItems) + 'px'
  }
  else {
    section.style.marginLeft = parseInt(section.style.marginLeft) + (itemWidth + spaceBetweenItems) + 'px'
  }

  wrapper.scrollLeft = 0

  prevFocusedIndex = focusedIndex
}


@SNReact.Decorators.Element()
@CSSModules(style)
export default class ContentSection extends React.Component {
  constructor(props) {
    super()

    this.state = {
      sections: null
    }
  }

  componentDidMount() {
    const { SNElement: { collection } } = this.props

    collection.eventAggregator.subscribe('onNavigate', () => {
      shiftItems(collection.focusedIndex)
    })
  }

  render() {
    const { index: sectionIndex, items } = this.props

    const styles = {
      top: `${sectionIndex * (sectionHeight + spaceBetweenSections)}px`
    }

    return (
      <div styleName="section" style={styles}>
        {
          items.map((item, index) => (
            <Item key={index} {...item} sectionIndex={sectionIndex * 25} index={index} />
          ))
        }
      </div>
    )
  }
}

// <Item key={index} {...item} sectionIndex={sectionIndex * 25} index={index} disabled={!Boolean((index + 1) % 5)} />
