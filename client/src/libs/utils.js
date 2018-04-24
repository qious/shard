import moment from 'moment'

// moment 设置为中文
moment.locale('zh-cn')

export function fromNow (time) {
  return moment(time).fromNow()
}

export default {
  fromNow
}
