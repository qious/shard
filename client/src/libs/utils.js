import _ from 'lodash'

let getTrafficPercent = function (trafficEnable, trafficUsed) {
  let unused = trafficEnable - trafficUsed
  if (unused < 0 || trafficEnable <= 0) {
    return 0
  }
  return _.round(unused / trafficEnable, 4)
}

let formatTraffic = function (input, reverse) {
  let weight = 1073741824
  if (reverse) {
    return input / weight
  }
  return input * weight
}

let formatBoolean = function (input, reverse) {
  if (reverse) {
    return input ? 'Y' : 'N'
  }
  return input === 'Y'
}

export {
  getTrafficPercent,
  formatTraffic,
  formatBoolean
}
