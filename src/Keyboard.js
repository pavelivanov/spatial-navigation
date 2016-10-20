import EA from './EventAggregator'


class Keyboard {
  constructor() {
    // TODO move outside to dynamically add keys
    this.keyMapping = {
      left: {
        keyCode: 37
      },
      up: {
        keyCode: 38
      },
      right: {
        keyCode: 39
      },
      down: {
        keyCode: 40
      },
      search: {
        keyCode: 70,
        modifier: 'ctrl'
      }
    };
    this.normalizeMap = {};
    this.addToMap(this.keyMapping);
    this.didMount()
  }

  /**
   *
   * @param keyCode
   * @param {string|KeyboardEvent}modifier
   * @returns {string}
   */
  static getEventKey(keyCode, modifier) {
    let key = [keyCode];
    if (modifier instanceof KeyboardEvent) {
      if ((window.navigator.platform.match(/^Mac/) ? modifier.metaKey : modifier.ctrlKey)) {
        key.push('ctrl')
      } else if (modifier.shiftKey) {
        key.push('shift')
      } else if (modifier.altKey) {
        key.push('alt')
      }
    }
    return key.join('|')
  }

  addToMap(mapping) {
    for (let i in mapping) {
      let eventKey = Keyboard.getEventKey(mapping[i].keyCode, mapping[i].modifier);
      if (Boolean(this.normalizeMap[eventKey])) {
        throw new Error(`Keymap ${eventKey} exists with name ${this.normalizeMap[eventKey].name}. Check your map name ${i}`);
      }
      this.normalizeMap[Keyboard.getEventKey(mapping[i].keyCode, mapping[i].modifier)] = Object.assign(mapping[i], { name: i })
    }
  }

  /**
   * @static
   * @param {KeyboardEvent} event
   * @param {string} modifier
   */
  static getModifier(event, modifier) {
    switch (modifier) {
      case 'ctrl':
        return (window.navigator.platform.match(/^Mac/) ? event.metaKey : event.ctrlKey);
      case 'shift':
        return event.shiftKey;
      case 'alt':
        return event.altKey;
      default:
        return true;
    }
  }

  didMount() {
    this.bindListeners()
  }

  bindListeners() {
    document.addEventListener('keydown', ::this.keyPress, false)
  }

  keyPress(event) {
    const eventKey = Keyboard.getEventKey(event.keyCode, event);
    if (
      !Boolean(eventKey in this.normalizeMap)
      || !Boolean(Keyboard.getModifier(event, this.normalizeMap[eventKey].modifier))
    ) return;
    event.preventDefault();
    const eventCode = this.normalizeMap[eventKey].name;
    EA.dispatchEvent('si:keypress', eventCode)
  }
}

export default new Keyboard
