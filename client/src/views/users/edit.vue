<template>
  <div class="user-edit">
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
        <div class="weui-cell" :class="{'weui-cell_warn': isTrafficError}">
          <div class="weui-cell__hd">
            <label class="weui-label">流量上限</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入流量上限" v-model="trafficLimit">
          </div>
          <div class="weui-cell__ft" v-if="isTrafficError">
            <i class="weui-icon-warn"></i>
          </div>
          <div class="weui-cell__ft" v-else>GB</div>
        </div>
      </div>

      <div class="weui-cells__title">用户信息</div>
      <div class="weui-cells weui-cells_form weui-panel__bd">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">用户名</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入用户名" v-model="username">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">用户昵称</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入昵称" v-model="nickname">
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">用户角色</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="isAdmin">
              <option value="0">用户</option>
              <option value="1">管理员</option>
            </select>
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">用户状态</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="isLocked">
              <option value="0">正常</option>
              <option value="1">锁定</option>
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
            <div
              class="weui-btn weui-btn_warn"
              :class="{'weui-btn_loading': isSubmit || isRemove}"
              @click="remove()">
              <span v-if="isRemove">
                <i class="weui-loading"></i> 删除中
              </span>
              <span v-else>删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

const TRAFFIC_MULTIPLE = 1073741824

export default {
  data () {
    return {
      username: null,
      nickname: null,
      port: null,
      password: null,
      trafficLimit: null,
      isAdmin: null,
      isLocked: null,
      isLoading: false,
      isSubmit: false,
      isRemove: false
    }
  },

  computed: {
    userId () {
      return this.$route.params.userId
    },
    isPortError () {
      return this.port && (isNaN(this.port) || this.port > 65535 || this.port <= 0)
    },
    isPasswordError () {
      return this.password && (this.password.length < 6 || this.password.length > 12)
    },
    isTrafficError () {
      return this.trafficLimit && isNaN(this.trafficLimit)
    },
    isValid () {
      return this.username && this.nickname &&
             this.port && !this.isPortError &&
             this.password && !this.isPasswordError &&
             this.trafficLimit && !this.isTrafficError &&
             this.isAdmin !== null && this.isLocked !== null
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api(`/api/users/${this.userId}`).then(({ data }) => {
        this.isLoading = false
        this.username = data.username
        this.nickname = data.nickname
        this.port = data.port
        this.password = data.password
        this.trafficLimit = data.trafficLimit / TRAFFIC_MULTIPLE
        this.isAdmin = Number(data.isAdmin)
        this.isLocked = Number(data.isLocked)
      }).catch(() => {
        this.isLoading = false
      })
    },

    submit () {
      if (!this.isValid || this.isSubmit) {
        return false
      }

      this.isSubmit = true
      Api(`/api/users/${this.userId}`, {
        method: 'PUT',
        body: {
          username: this.username,
          nickname: this.nickname,
          port: Number(this.port),
          password: this.password,
          trafficLimit: this.trafficLimit * TRAFFIC_MULTIPLE,
          isAdmin: Boolean(Number(this.isAdmin)),
          isLocked: Boolean(Number(this.isLocked))
        }
      }).then(() => {
        this.isSubmit = false
        this.$router.push({name: 'user-detail'})
      }).catch(() => {
        this.isSubmit = false
      })
    },

    remove () {
      if (this.isSubmit || this.isRemove) {
        return false
      } else if (!confirm('你确定要删除当前用户吗?')) {
        return false
      }

      this.isRemove = true
      Api(`/api/users/${this.userId}`, {
        method: 'DELETE'
      }).then(() => {
        this.isRemove = false
        this.$router.push({name: 'users'})
      }).catch(() => {
        this.isRemove = false
      })
    }
  }
}
</script>

<style lang="less">
.user-edit {
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
