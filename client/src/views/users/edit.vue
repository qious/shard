<template>
  <div class="users-edit">
    <div class="weui-loadmore" v-show="isLoading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <div v-show="!isLoading">
      <div class="weui-cells__title">服务信息</div>
      <div class="weui-cells weui-cells_form weui-panel__bd">
        <div class="weui-cell" :class="{'weui-cell_warn': isPortError}">
          <div class="weui-cell__hd">
            <label class="weui-label">SS 端口</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入 SS 端口" v-model="port">
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
            <input class="weui-input" type="text" placeholder="请输入 SS 密码" v-model="password">
          </div>
          <div class="weui-cell__ft" v-if="isPasswordError">
            <i class="weui-icon-warn"></i>
          </div>
        </div>
        <div class="weui-cell" :class="{'weui-cell_warn': isTransferError}">
          <div class="weui-cell__hd">
            <label class="weui-label">流量上限</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入流量上限" v-model="transferEnable">
          </div>
          <div class="weui-cell__ft" v-if="isTransferError">
            <i class="weui-icon-warn"></i>
          </div>
          <div class="weui-cell__ft" v-else>GB</div>
        </div>
      </div>

      <div class="weui-cells__title">用户信息</div>
      <div class="weui-cells weui-cells_form weui-panel__bd">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">用户姓名</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入姓名" v-model="name">
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">用户角色</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="isAdmin">
              <option value="N">用户</option>
              <option value="Y">管理员</option>
            </select>
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">用户状态</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="isLocked">
              <option value="N">正常</option>
              <option value="Y">锁定</option>
            </select>
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled': !isValid, 'weui-btn_loading': isValid && isSubmit}" @click="submit()">
              <span v-if="isSubmit">
                <i class="weui-loading"></i> 保存中
              </span>
              <span v-else>保存</span>
            </div>
          </div>
          <div class="weui-flex__item">
            <router-link :to="{name: 'user-detail'}" class="weui-btn weui-btn_default" :class="{'weui-btn_loading': isSubmit}">返回</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import {formatTransfer, formatBoolean} from '../../libs/utils'

export default {
  data () {
    return {
      userId: null,
      port: null,
      password: null,
      transferEnable: null,
      name: null,
      isAdmin: null,
      isLocked: null,
      isLoading: false,
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
    isTransferError () {
      return this.transferEnable && isNaN(this.transferEnable)
    },
    isValid () {
      return this.port && !this.isPortError &&
             this.password && !this.isPasswordError &&
             this.transferEnable && !this.isTransferError &&
             this.name && this.isAdmin && this.isLocked
    }
  },

  created () {
    this.userId = this.$route.params.userId
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      let userId = this.userId
      Api('/api/users/detail', {query: {userId}}).then(({data}) => {
        this.isLoading = false
        this.port = data.port
        this.password = data.password
        this.transferEnable = formatTransfer(data.transferEnable, true)
        this.name = data.name
        this.isAdmin = formatBoolean(data.isAdmin, true)
        this.isLocked = formatBoolean(data.isLocked, true)
      }).catch(() => {
        this.isLoading = false
      })
    },

    submit () {
      if (!this.isValid || this.isSubmit) {
        return false
      }
      this.isSubmit = true

      let body = {
        userId: this.userId,
        port: Number(this.port),
        password: this.password,
        transferEnable: formatTransfer(this.transferEnable),
        name: this.name,
        isAdmin: formatBoolean(this.isAdmin),
        isLocked: formatBoolean(this.isLocked)
      }
      Api('/api/users', {method: 'PUT', body}).then(() => {
        this.isSubmit = false
        this.$router.push({name: 'user-detail'})
      }).catch(() => {
        this.isSubmit = false
      })
    }
  }
}
</script>

<style lang="less">
.users-edit {
  .weui-cell .weui-cell__ft {
    font-size: 1em;
  }

  .weui-btn {
    margin: 0 5px;
    &:after {
      border: 0px;
    }
  }
}
</style>
