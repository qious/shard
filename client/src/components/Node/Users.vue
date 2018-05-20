<template>
  <div class="comp-node-users">
    <div class="weui-panel__hd">
      活跃用户
      <i class="fa fa-expand" v-if="!showAll" @click="showAll = true"></i>
      <i class="fa fa-compress" v-else @click="showAll = false"></i>
    </div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-loadmore" v-if="loading">
          <i class="weui-loading"></i>
          <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-else-if="!users || !users.length">
          <span class="weui-loadmore__tips">暂无用户信息</span>
        </div>
        <div class="weui-cells" v-else>
          <div class="weui-cell" v-for="user in filtered" :key="user.userId">
            <div class="weui-cell__bd">{{user.nickname}}</div>
            <div class="weui-cell__ft">{{user.activedAt ? fromNow(user.activedAt) : '从未使用'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { fromNow } from '@/libs/utils'

export default {
  props: ['loading', 'users'],

  data () {
    return {
      showAll: false
    }
  },

  computed: {
    filtered () {
      return _.slice(this.users, 0, this.showAll ? this.users.length : 5)
    }
  },

  methods: {
    fromNow
  }
}
</script>

<style lang="less">
.comp-node-users {
  .fa.fa-expand,
  .fa.fa-compress {
    float: right;
  }
}
</style>
