<template>
  <div class="comp-traffic-info">
    <div class="weui-panel__hd">流量信息</div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>上传流量</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{filesize(user.flowUp || 0)}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>下载流量</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{filesize(user.flowDown || 0)}}</span>
            </div>
          </div>
          <router-link
            class="weui-cell weui-cell_access weui-cell_link"
            :to="detailLink">
            <div class="weui-cell__bd">流量详情</div>
            <span class="weui-cell__ft"></span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from 'filesize'

export default {
  props: ['isprofile', 'user', 'loading'],

  computed: {
    detailLink () {
      if (this.loading) {
        return {}
      }
      let to = { name: 'traffic-stat' }
      if (this.isprofile) {
        return to
      }
      return Object.assign(to, {
        query: {
          userId: this.user.userId
        }
      })
    }
  },

  methods: {
    filesize
  }
}
</script>
