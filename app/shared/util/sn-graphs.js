const map = {
  'Sidebar': {
    right: 'Content'
  },
  'Header': {
    left: 'Sidebar',
    down: 'Content'
  },
  'Content': {
    up: 'Header',
    left: 'Sidebar'
  }
}

export default map
