import React from 'react'
import ReactDOM from 'react-dom'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import contentStyle from '../style'
import style from './style'

import Item from './Item'


const sectionHeight = 200
const spaceBetweenSections = 20
const itemWidth = 220
const spaceBetweenItems = 20

const shiftItems = (sectionWrapper, section) => {
  let prevFocusedIndex = 0
  let sectionCurrMarginLeft = 0

  return (focusedIndex) => {
    const contentWrapper = document.getElementsByClassName(contentStyle.wrapper)[0]
    const focusedElm = section.children[focusedIndex]
    const direction = focusedIndex > prevFocusedIndex ? 'right' : 'left'

    const sectionWrapperWidth   = sectionWrapper.offsetWidth
    const centringOffsetLeft    = (sectionWrapperWidth - itemWidth) / 2
    const focusedElmOffsetLeft  = focusedElm.offsetLeft
    let sectionNewMarginLeft

    if (focusedElmOffsetLeft > centringOffsetLeft || Math.abs(sectionCurrMarginLeft) > centringOffsetLeft) {
      sectionNewMarginLeft = sectionCurrMarginLeft + centringOffsetLeft - focusedElmOffsetLeft
      section.style.marginLeft = sectionNewMarginLeft + 'px'
    }
    else {
      sectionNewMarginLeft = 0
      section.style.marginLeft = sectionNewMarginLeft + 'px'
    }

    contentWrapper.scrollLeft = 0
    sectionCurrMarginLeft = sectionNewMarginLeft
    prevFocusedIndex = focusedIndex
  }
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

    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    const section = ReactDOM.findDOMNode(this.refs.section)
    const method = shiftItems(wrapper, section)

    collection.eventAggregator.subscribe('onNavigate', () => method(collection.focusedIndex))
  }

  render() {
    const { index: sectionIndex, items } = this.props

    const styles = {
      top: `${sectionIndex * (sectionHeight + spaceBetweenSections)}px`
    }

    return (
      <div ref="wrapper" styleName="wrapper" style={styles}>
        <div ref="section" styleName="section">
          {
            items.map((item, index) => (
              <Item key={index} {...item} sectionIndex={sectionIndex * items.length} index={index} />
            ))
          }
        </div>
      </div>
    )
  }
}

// <Item key={index} {...item} sectionIndex={sectionIndex * 25} index={index} disabled={!Boolean((index + 1) % 5)} />
