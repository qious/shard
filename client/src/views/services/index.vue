<template>
  <div class="services">
    <div class="weui-panel weui-panel_access">
      <service-info :title="'全局配置'" :user="profile" :loading="isLoading"></service-info>

      <div class="weui-panel__hd">服务列表</div>
      <div class="weui-panel__bd">
        <div class="weui-loadmore" v-if="loading">
          <i class="weui-loading"></i>
          <span class="weui-loadmore__tips">加载中...</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-else-if="!items || !items.length">
          <span class="weui-loadmore__tips">暂无服务</span>
        </div>
        <router-link :to="{name: 'service-detail', params: {serviceId: item.serviceId}}"
          class="weui-media-box weui-media-box_appmsg" v-for="item in items" :key="item.serviceId">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="item.avatar">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.name}}</h4>
            <p class="weui-media-box__desc">{{item.description}}</p>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">{{item.server}}</li>
              <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{item.method}}</li>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import ServiceInfo from '../../components/Service/Info'

export default {
  props: ['profile'],
  components: {
    ServiceInfo
  },

  data () {
    return {
      loading: false,
      items: []
    }
  },

  computed: {
    isLoading () {
      return !this.profile.port && !this.profile.password
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.loading = true
      Api('/api/services').then(({data}) => {
        this.loading = false
        this.items = data
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
.services {
  .weui-media-box__info {
    margin-top: 10px;
  }
  .weui-media-box_appmsg .weui-media-box__thumb {
    vertical-align: middle;
  }
}
</style>
