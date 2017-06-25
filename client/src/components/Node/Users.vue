<template>
  <div>
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
          <div class="weui-cell" v-for="user in filtered">
            <div class="weui-cell__bd">{{user.name}}</div>
            <div class="weui-cell__ft">{{user.activeAt}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

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
  }
}
</script>

<style scoped>
.fa {
  float: right;
}
</style>
