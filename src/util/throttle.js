const throttle = (func, threshold) => {
  let isFirstCall = true
  let isThrottled = false
  let callTimer

  const clearVariables = () => {
    isFirstCall = true
    isThrottled = false
  }

  // there is ~250ms delay between first and second call and ~35ms after
  const wrapper = function (...args) {
    if (isFirstCall) {
      isFirstCall = false
      func.call(this, ...args)
    }

    if (!isThrottled) {
      isThrottled = true

      callTimer = setTimeout(() => {
        isThrottled = false
        func.call(this, ...args)
      }, threshold)
    }
  }

  wrapper.__proto__.finish = () => {
    clearVariables()
    clearTimeout(callTimer)
  }

  return wrapper
}

export default throttle
