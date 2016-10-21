import { LOG_LEVEL } from './util/constants'


export const LEVEL_DEBUG = 0
export const LEVEL_INFO = 1
export const LEVEL_WARN = 2
export const LEVEL_ERROR = 3

class Logger {

  constructor() {
    this.debug = Logger.log.bind(this, LEVEL_DEBUG)
    this.info = Logger.log.bind(this, LEVEL_INFO)
    this.warn = Logger.log.bind(this, LEVEL_WARN)
    this.error = Logger.log.bind(this, LEVEL_ERROR)
  }

  static log(level, msg, attributes) {
    if (Logger.getLevel(LOG_LEVEL) > level) return
    console.log(Logger.getLevelView(level) + ' - ' + msg, attributes)
  }

  static getLevel(strLevel) {
    return [
      'debug',
      'info',
      'warn',
      'error'
    ].find(level => level == strLevel.toLowerCase())
  }

  /**
   *
   * @param level
   * @returns {string}
   */
  static getLevelView(level) {
    return [
      'debug',
      'info',
      'warn',
      'error'
    ][level]
  }
}

export default new Logger()
