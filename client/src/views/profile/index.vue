<template>
  <div class="profile">
    <traffic-chart-sum :user="profile"></traffic-chart-sum>

    <div class="weui-panel">
      <traffic-info
        :user="profile"
        :loading="isLoading"
        :isprofile="true">
      </traffic-info>
      <service-info
        :title="'服务信息'"
        :user="profile"
        :loading="isLoading">
      </service-info>

      <div class="weui-panel__hd">个人信息</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>姓名</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="!profile.nickname"></i>
                <span v-else>{{profile.nickname}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>用户 ID</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="!profile.username"></i>
                <span v-else>{{profile.username}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>最后在线</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="!profile.activedAt"></i>
                <span v-else>{{profile.activedAt}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>加入时间</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="!profile.createdAt"></i>
                <span v-else>{{profile.createdAt}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrafficChartSum from '../../components/Traffic/Chart/Sum'
import TrafficInfo from '../../components/Traffic/Info'
import ServiceInfo from '../../components/Service/Info'

export default {
  props: ['profile'],
  components: {
    TrafficChartSum,
    TrafficInfo,
    ServiceInfo
  },
  computed: {
    isLoading () {
      return !this.profile.port && !this.profile.password
    }
  }
}
</script>

<style lang="less">
.profile {
  .weui-panel {
    margin-top: 0;
  }
}
</style>
