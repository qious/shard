<template>
  <div class="services-detail">
    <div class="weui-cells__title">服务信息</div>
    <div class="weui-cells weui-cells_form weui-panel__bd">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">服务器</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="service.server" disabled>
        </div>
        <div class="weui-cell__ft">
          <button
            class="copy"
            v-clipboard="service.server"
            @success="copySuccess"
            @error="copyError"
            v-if="!isLoading">
            <i class="fa fa-copy"></i>
          </button>
          <i class="weui-loading" v-else></i>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">远程端口</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="service.port" disabled>
        </div>
        <div class="weui-cell__ft">
          <button
            class="copy"
            v-clipboard="service.port"
            @success="copySuccess"
            @error="copyError"
            v-if="!isLoading">
            <i class="fa fa-copy"></i>
          </button>
          <i class="weui-loading" v-else></i>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">加密方式</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="service.method" disabled>
        </div>
        <div class="weui-cell__ft">
          <button
            class="copy"
            v-clipboard="service.method"
            @success="copySuccess"
            @error="copyError"
            v-if="!isLoading">
            <i class="fa fa-copy"></i>
          </button>
          <i class="weui-loading" v-else></i>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">密码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="service.password" disabled>
        </div>
        <div class="weui-cell__ft">
          <button
            class="copy"
            v-clipboard="service.password"
            @success="copySuccess"
            @error="copyError"
            v-if="!isLoading">
            <i class="fa fa-copy"></i>
          </button>
          <i class="weui-loading" v-else></i>
        </div>
      </div>
    </div>

    <div class="weui-cells__title">快速连接</div>
    <div class="weui-cells weui-cells_form weui-panel__bd">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">SS 协议</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="service.uri" disabled>
        </div>
        <div class="weui-cell__ft">
          <button
            class="copy"
            v-clipboard="service.uri"
            @success="copySuccess"
            @error="copyError"
            v-if="!isLoading">
            <i class="fa fa-copy"></i>
          </button>
          <i class="weui-loading" v-else></i>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <div class="weui-flex__item">
        <router-link
          :to="{name: 'services'}"
          class="weui-btn weui-btn_default">
          返回
        </router-link>
      </div>
    </div>

    <div class="toast" :class="{show: showSuccess}">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已复制</p>
      </div>
    </div>

  </div>
</template>

<script>
import Api from '../../api'

export default {
  data () {
    return {
      serviceId: null,
      isLoading: false,
      service: {
        uri: 'ss://'
      },
      showSuccess: false
    }
  },

  created () {
    this.serviceId = Number(this.$route.params.serviceId)
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api(`/api/services/${this.serviceId}`).then(({ data }) => {
        this.isLoading = false
        this.service = data
        this.service['uri'] = this.genUri(data)
      })
    },

    genUri (service) {
      let user = `${service.method}:${service.password}`
      user = new Buffer(user).toString('base64')
      user = user.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
      let mark = encodeURIComponent(service.name)
      return `ss://${user}@${service.server}:${service.port}#${mark}`
    },

    copySuccess () {
      if (this.showSuccess) {
        return
      }
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 1000)
    },

    copyError () {
      alert('复制失败')
    }
  }
}
</script>

<style lang="less">
.services-detail {
  .copy {
    display: inline-block;
    height: 25px;
    margin-left: 5px;
    padding: 0 0.6em 0 0.7em;
    border-left: 1px solid #E5E5E5;
    line-height: 25px;
    vertical-align: middle;
    font-size: 17px;
    color: #3CC51F;
    background-color: transparent;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    outline: 0;
    cursor: pointer;
  }

  .toast {
    display: none;
  }

  .toast.show {
    display: block;
  }
}

</style>
