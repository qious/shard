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
      serviceJson: '加载中...'
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
        let filter = ['server', 'server_port', 'password', 'method']
        data.server_port = data.port
        data = _.pick(data, filter)
        this.serviceJson = JSON.stringify(data, null, 4)
      })
    }
  }
}
</script>
