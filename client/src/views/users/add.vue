<template>
  <div class="user-add">
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
    </div>

    <div class="weui-btn-area">
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled': !isValid, 'weui-btn_loading': isValid && isLoading}" @click="add()">
            <span v-if="isLoading">
              <i class="weui-loading"></i> 保存中
            </span>
            <span v-else>保存</span>
          </div>
        </div>
        <div class="weui-flex__item">
          <router-link :to="{name: 'users'}" class="weui-btn weui-btn_default" :class="{'weui-btn_loading': isLoading}">返回</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  data () {
    return {
      username: null,
      nickname: null,
      isLoading: false
    }
  },

  computed: {
    isValid () {
      return this.username && this.nickname
    }
  },

  methods: {
    add () {
      if (!this.isValid || this.isLoading) {
        return false
      }

      this.isLoading = true
      Api(`/api/users`, {
        method: 'POST',
        body: {
          username: this.username,
          nickname: this.nickname
        }
      }).then(({ data: { userId } }) => {
        this.isLoading = false
        this.$router.push({name: 'user-detail', params: { userId }})
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="less">
.user-add {
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
