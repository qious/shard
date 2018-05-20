<template>
  <div class="users">
    <div class="weui-loadmore" v-if="isLoading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">加载中...</span>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-else-if="!items || !items.length">
      <span class="weui-loadmore__tips">暂无数据</span>
    </div>
    <div class="weui-panel weui-panel_access" v-else>
      <div class="weui-panel__bd">
        <router-link :to="{name: 'user-detail', params: {userId: item.userId}}"
          class="weui-media-box weui-media-box_appmsg" v-for="item in items" :key="item.userId">
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">
              <span>{{item.nickname}}</span>
              <span class="value">{{filesize(item.flowUp + item.flowDown)}}</span>
            </h4>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">
                {{item.activedAt ? ('活跃于 '+ fromNow(item.activedAt)) : '从未使用'}}
              </li>
              <li class="weui-media-box__info__meta">
                {{'已用，共 ' + filesize(item.trafficLimit)}}
              </li>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import filesize from 'filesize'
import { fromNow } from '@/libs/utils'

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
      Api('/api/users').then(({ data }) => {
        this.isLoading = false
        this.items = data
      }).catch(() => {
        this.isLoading = false
      })
    },

    filesize,

    fromNow
  }
}
</script>

<style lang="less">
.users {
  .weui-media-box__title {
    font-size: 1.1em;
    .value {
      float: right;
      color: #FB7886;
      span:last-child {
        font-size: 0.6em;
      }
    }
  }

  .weui-media-box__info {
    margin-top: 10px;
    .weui-media-box__info__meta:last-child {
      float: right;
      padding-right: 0;
    }
  }
}
</style>
