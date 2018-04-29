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
        :user="profile"
        :loading="isLoading"
        :isprofile="true">
      </service-info>

      <user-info
        :user="profile"
        :loading="isLoading">
      </user-info>
    </div>

  </div>
</template>

<script>
import TrafficInfo from '@/components/Traffic/Info'
import ServiceInfo from '@/components/Service/Info'
import TrafficChartSum from '@/components/Traffic/Chart/Sum'
import UserInfo from '@/components/User/Info'

export default {
  props: ['profile'],
  components: {
    TrafficInfo,
    ServiceInfo,
    TrafficChartSum,
    UserInfo
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
