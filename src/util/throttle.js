/**
 * Created by gillbeits on 20/10/2016.
 */

export const throttle = function (func, ms) {

  var isThrottled = false,
    timer,
    savedArgs,
    savedThis;

  function wrapper(...args) {

    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }
    else {
      args.push(wrapper)
    }

    func.apply(this, args);

    isThrottled = true;

    timer = setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  wrapper.__proto__.throttle = function () {
    isThrottled = false
    clearTimeout(timer)
  }

  return wrapper;
}