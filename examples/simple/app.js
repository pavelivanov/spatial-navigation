var SN = spatialNavigation;


SN.Keyboard.addToMap([
  { keyCode: 37, name: 'left' },
  { keyCode: 38, name: 'up' },
  { keyCode: 39, name: 'right' },
  { keyCode: 40, name: 'down' },
  { keyCode: 27, name: 'esc' },
  { keyCode: 13, name: 'enter' },
  { keyCode: 9, name: 'tab' }
])


var SidebarContainer  = spatialNavigation.ContainerCollection.add(SN.Container.create('Sidebar', {
  map: {
    right: 'Content'
  }
}));

var HeaderContainer   = spatialNavigation.ContainerCollection.add(SN.Container.create('Sidebar', {
  map: {
    left: 'Sidebar',
    down: 'Content'
  }
}));

var ContentContainer  = spatialNavigation.ContainerCollection.add(SN.Container.create('Content', {
  map: {
    up: 'Header',
    left: 'Sidebar'
  },
  startContainer: true
}));


var navigItems    = document.getElementsByClassName('navigItem');
var cards         = document.getElementsByClassName('cardContent');
var search        = document.getElementsByClassName('search')[0];


for (var i = 0; i < navigItems.length; i++) {
  var navigItem = navigItems[i];

  SidebarContainer.collection.add(spatialNavigation.Element.create(navigItem))
}

HeaderContainer.collection.add(spatialNavigation.Element.create(search))

for (var k = 0; k < cards.length; k++) {
  var card = cards[k];

  ContentContainer.collection.add(spatialNavigation.Element.create(card))
}
