<template>
  <div class="traffic">
    <traffic-chart-stat
      :data="stat"
      :loading="isLoading">
    </traffic-chart-stat>

    <div class="navbar">
      <router-link
        class="back"
        :to="{name: userId? 'user-detail' : 'profile'}">
        <i class="fa fa-angle-left fa-lg"></i>
      </router-link>
    </div>

    <div class="weui-panel">
      <traffic-stat
        :loading="isLoading"
        :stat="stat">
      </traffic-stat>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import TrafficStat from '../../components/Traffic/Stat'
import TrafficChartStat from '../../components/Traffic/Chart/Stat'

export default {
  props: ['profile'],
  components: {
    TrafficStat,
    TrafficChartStat
  },

  data () {
    return {
      userId: null,
      stat: [],
      isLoading: false
    }
  },

  created () {
    this.userId = this.$route.params.userId
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      let query = this.userId ? {userId: this.userId} : {}
      Api('/api/traffic/stat', {query}).then(({data}) => {
        this.isLoading = false
        this.stat = data
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="less">
.traffic {
  .detail {
    position: relative;
  }

  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .back {
      position: absolute;
      top: 15px;
      color: #fff;
      left: 15px;
    }
  }

  .weui-panel {
    margin-top: 0;
  }
}
</style>
