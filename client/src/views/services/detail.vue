<template>
  <div>
    <div class="weui-panel">
      <div class="weui-panel__hd">服务信息</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd weui-cell_primary">
                <textarea class="weui-textarea" rows="6" v-model="serviceJson"></textarea>
              </div>
            </div>
          </div>
          <div class="weui-cells">
            <div class="weui-cell weui-cell_uri">
              <div class="weui-cell__bd weui-cell_primary">
                <input class="weui-input" type="text" v-model="serviceUri">
              </div>
              <div class="weui-cell__ft">
                <button
                  class="weui-vcode-btn"
                  v-clipboard="serviceUri"
                  @success="copySuccess"
                  @error="copyError">
                  复制
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="weui-btn-area">
      <div class="weui-flex__item">
        <router-link :to="{name: 'services'}" class="weui-btn weui-btn_default">返回</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Api from '../../api'

export default {
  data () {
    return {
      serviceId: null,
      isLoading: false,
      serviceJson: '加载中...',
      serviceUri: 'ss://'
    }
  },

  created () {
    this.serviceId = Number(this.$route.params.serviceId)
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      let serviceId = this.serviceId
      Api('/api/services/detail', {
        query: {
          serviceId
        }
      }).then(({data}) => {
        this.isLoading = false
        let name = data.name
        let filter = ['server', 'server_port', 'password', 'method']
        data.server_port = data.port
        data = _.pick(data, filter)
        this.serviceJson = JSON.stringify(data, null, 4)
        this.serviceUri = this.genUri(name, data)
      })
    },

    genUri (name, data) {
      let user = `${data.method}:${data.password}`
      user = new Buffer(user).toString('base64')
      user = user.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
      return `ss://${user}@${data.server}:${data.server_port}#${encodeURIComponent(name)}`
    },

    copySuccess () {
      alert('复制成功')
    },

    copyError () {
      alert('复制失败')
    }
  }
}
</script>

<style scoped>
.weui-textarea {
  word-break: break-all;
}
.weui-cell_uri {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
</style>
