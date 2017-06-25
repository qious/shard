import _ from 'lodash'

let getTransferPercent = function (transferEnable, transferUsed) {
  let unused = transferEnable - transferUsed
  if (unused < 0 || transferEnable <= 0) {
    return 0
  }
  return _.round(unused / transferEnable, 4)
}

let formatTransfer = function (input, reverse) {
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
  getTransferPercent,
  formatTransfer,
  formatBoolean
}
