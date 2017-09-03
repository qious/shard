<template>
  <div class="comp-transfer-stat">
    <div class="weui-panel__hd">
      流量详情
      <i class="fa fa-expand" v-if="fold && !showAll" @click="showAll = true"></i>
      <i class="fa fa-compress" v-else-if="fold" @click="showAll = false"></i>
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
          <div class="weui-cell" v-for="item in data" :key="item.date">
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
  props: ['loading', 'stat', 'fold'],

  data () {
    return {
      showAll: false
    }
  },

  computed: {
    data () {
      if (!this.stat || !this.stat.length) {
        return []
      }
      let data = _.reverse(_.slice(this.stat))

      if (!this.fold || this.showAll) {
        return data
      }
      return _.slice(data, 0, 5)
    }
  }
}
</script>

<style lang="less">
.comp-transfer-stat {
  .fa-expand,
  .fa-compress {
    float: right;
  }
}
</style>
