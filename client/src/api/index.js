import 'whatwg-fetch'
import url from 'url'

let getLoginUrl = function (config) {
  return url.format({
    protocol: 'https',
    host: 'open.weixin.qq.com',
    pathname: '/connect/oauth2/authorize',
    query: Object.assign(config, {state: location.href}),
    hash: '#wechat_redirect'
  })
}

let handleHttpError = function (status, data) {
  switch (status) {
    case 401:
      location.href = getLoginUrl(data.extra)
      return true
    default:
      alert(data.message)
      return false
  }
}

export default function (uri, params) {
  params = params || {}
  params.method = params.method || 'GET'

  // 提交 Cookie
  params.credentials = 'same-origin'

  // 处理 POST参数，POST 使用 JSON
  if (['POST', 'PUT'].indexOf(params.method) !== -1) {
    params.headers = params.headers || {}
    if (!(params.body instanceof FormData)) {
      if (!params.headers['Content-Type'] && !params.headers['content-type']) {
        params.headers['Content-Type'] = 'application/json'
        if (params.body && typeof body !== 'string') {
          params.body = JSON.stringify(params.body)
        }
      }
    }
  }

  // 处理 GET 参数
  uri = uri + url.format({query: params.query})
  params.query = undefined

  let status, data
  return fetch(uri, params)
    .then((res) => {
      status = res.status
      return res.json()
    })
    .then((res) => {
      data = res

      if (status >= 400) {
        throw new Error(data.message)
      }
      return {status, data}
    })
    .catch(function (err) {
      if (typeof data !== 'object') {
        data = {message: err.message}
      }

      handleHttpError(status, data)
      throw err
    })
}
