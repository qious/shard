<template>
  <div class="offer">
    <div class="page__hd">
      <h1 class="page__title">捐助</h1>
      <p class="page__desc">为平等的获取知识，如果你有空闲的服务器，欢迎提供给本项目进行多节点部署。</p>
    </div>
    <div class="weui-cells__title">捐助排行榜</div>
    <div class="weui-loadmore" v-if="isLoading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">加载中...</span>
    </div>
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access"
        :href="item.url"
        :key="item.offerId"
        v-for="item in items">
        <div class="weui-cell__bd">
          <p>{{item.name}}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a >
    </div>
  </div>
</template>

<script>
import Api from '../api'

export default {
  data () {
    return {
      isLoading: false,
      items: []
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api('/api/offers').then(({data}) => {
        this.isLoading = false
        this.items = data
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="less">
.offer {
  .page__hd {
    padding: 40px;
  }
  .page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
  }
  .page__desc {
    margin-top: 5px;
    color: #888;
    text-align: left;
    font-size: 14px;
  }
}
</style>
