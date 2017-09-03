<template>
  <div class="profile-edit">
    <div class="weui-cells__title">服务信息</div>
    <div class="weui-cells weui-cells_form weui-panel__bd">
      <div class="weui-cell" :class="{'weui-cell_warn': isPortError}">
        <div class="weui-cell__hd">
          <label class="weui-label">SS 端口</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" placeholder="请输入端口" v-model="port">
        </div>
        <div class="weui-cell__ft" v-if="isLoading">
          <i class="weui-loading"></i>
        </div>
        <div class="weui-cell__ft" v-if="isPortError">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <div class="weui-cell" :class="{'weui-cell_warn': isPasswordError}">
        <div class="weui-cell__hd">
          <label class="weui-label">SS 密码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入密码" v-model="password">
        </div>
        <div class="weui-cell__ft" v-if="isLoading">
          <i class="weui-loading"></i>
        </div>
        <div class="weui-cell__ft" v-if="isPasswordError">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
    </div>

    <div class="weui-btn-area">
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div
            class="weui-btn weui-btn_primary"
            :class="{'weui-btn_disabled': !isValid, 'weui-btn_loading': isValid && isSubmit}"
            @click="submit()">
            <span v-if="isSubmit">
              <i class="weui-loading"></i> 保存中
            </span>
            <span v-else>保存</span>
          </div>
        </div>
        <div class="weui-flex__item">
          <div
            class="weui-btn weui-btn_default"
            :class="{'weui-btn_loading': isSubmit}"
            @click="$router.go(-1)">
            返回
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api'

export default {
  props: ['profile'],

  data () {
    return {
      port: null,
      password: null,
      isSubmit: false
    }
  },

  computed: {
    isLoading () {
      return !this.profile.port && !this.profile.password
    },
    isPortError () {
      return this.port && (isNaN(this.port) || this.port > 65535 || this.port <= 1024)
    },
    isPasswordError () {
      return this.password && (this.password.length < 6 || this.password.length > 12)
    },
    isValid () {
      return this.port && this.password && !this.isPortError && !this.isPasswordError
    }
  },

  created () {
    this.port = this.profile.port
    this.password = this.profile.password
  },

  methods: {
    submit () {
      if (!this.isValid || this.isSubmit) {
        return false
      }
      this.isSubmit = true

      let port = Number(this.port)
      let password = this.password
      Api('/api/profile', {
        method: 'PUT',
        body: {port, password}
      }).then(() => {
        this.isSubmit = false
        this.$emit('profileUpdate')
        this.$router.go(-1)
      }).catch(() => {
        this.isSubmit = false
      })
    }
  },

  watch: {
    profile () {
      this.port = this.profile.port
      this.password = this.profile.password
    }
  }
}
</script>

<style lang="less">
.profile-edit {
  .weui-btn {
    margin: 0 5px;
    &:after {
      border: 0px;
    }
  }
}
</style>
