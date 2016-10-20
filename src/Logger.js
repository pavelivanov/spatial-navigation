class Logger {
  constructor() {
    this.debug = Logger.log.bind(this, 'debug')
    this.info = Logger.log.bind(this, 'info')
    this.warn = Logger.log.bind(this, 'warn')
    this.error = Logger.log.bind(this, 'error')
  }

  static log(level, msg, attributes) {
    console.log(level + ' - ' + msg, attributes)
  }
}

export default new Logger
