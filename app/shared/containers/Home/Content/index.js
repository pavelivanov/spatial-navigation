import React from 'react'
import { SNReact } from 'SN'

import CSSModules from 'react-css-modules'
import style from './style'

import Section from './Section'


let prevFocusedIndex = 0
const sectionHeight = 200
const spaceBetweenSections = 10

const shiftSections = (focusedIndex) => {
  const wrapper   = document.getElementsByClassName(style.wrapper)[0]
  const content   = document.getElementsByClassName(style.content)[0]
  const sections  = content.childNodes
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

  wrapper.scrollTop = 0

  prevFocusedIndex = focusedIndex
}


@SNReact.Decorators.Container('Content', {
  map: { up: 'Search', left: 'Sidebar' },
  startContainer: true,
})
@CSSModules(style)
export default class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      sections: Array.apply(null, {length: 10}).map(() => Array.apply(null, {length: 15}).map(Number.call, Number))
    }
  }

  // componentWillMount() {
  //   const xmlHttp = new XMLHttpRequest()
  //
  //   xmlHttp.onreadystatechange = () => {
  //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && xmlHttp.response) {
  //       const cardSet = []
  //       const cards = JSON.parse(xmlHttp.response).slice(0, 150)
  //
  //       cards.forEach((card, index) => {
  //         if (!Boolean(index % 15)) {
  //           cardSet.push([])
  //         }
  //
  //         cardSet[cardSet.length - 1].push(card)
  //       })
  //
  //       this.setState({
  //         sections: cardSet
  //       })
  //     }
  //   }
  //
  //   xmlHttp.open('GET', 'https://jsonplaceholder.typicode.com/photos', false)
  //   xmlHttp.send(null)
  // }

  componentDidMount() {
    const { SNContainer: { collection } } = this.props

    collection.eventAggregator.subscribe('onNavigate', () => {
      shiftSections(collection.focusedIndex)
    })
  }

  render() {
    const { sections } = this.state

    return sections && (
      <div styleName="wrapper">
        <div styleName="content">
          {
            sections.map((items, index) => (
              <Section key={index} index={index} items={items} />
            ))
          }
        </div>
      </div>
    )
  }
}
