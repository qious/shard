<template>
  <div>
    <div class="weui-panel__hd">
      流量详情
      <i class="fa fa-expand" v-if="!showAll" @click="showAll = true"></i>
      <i class="fa fa-compress" v-else @click="showAll = false"></i>
    </div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-loadmore" v-if="loading">
          <i class="weui-loading"></i>
          <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-else-if="!stat || !stat.length">
          <span class="weui-loadmore__tips">暂无流量信息</span>
        </div>
        <div class="weui-cells" v-else>
          <div class="weui-cell" v-for="item in data">
            <div class="weui-cell__bd">
              {{item.date.slice(0, 2) + '月' + item.date.slice(3, 5) + '日'}}
            </div>
            <div class="weui-cell__ft">{{item.flowTotalV}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['loading', 'stat'],

  data () {
    return {
      showAll: false
    }
  },

  computed: {
    data () {
      return _.slice(this.stat, 0, this.showAll ? this.stat.length : 5)
    }
  },

  created () {
    this.reverseStat()
  },

  methods: {
    reverseStat () {
      if (!this.stat || !this.stat.length) {
        return false
      }
      this.stat = _.reverse(this.stat)
    }
  },

  watch: {
    stat () {
      this.reverseStat()
    }
  }
}
</script>

<style scoped>
.fa {
  float: right;
}
</style>
