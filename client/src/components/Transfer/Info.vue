<template>
  <div>
    <div class="weui-panel__hd">{{title || '流量信息'}}</div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>上传流量</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.flow_up_v}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>下载流量</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.flow_down_v}}</span>
            </div>
          </div>
          <router-link :to="{name: 'transfer-stat', params}"  class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd">流量详情</div>
            <span class="weui-cell__ft"></span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'user', 'loading', 'isprofile'],

  computed: {
    params () {
      return this.isprofile ? {} : {userId: this.user.userId}
    }
  }
}
</script>
