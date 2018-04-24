<template>
  <div class="traffic">
    <traffic-chart-stat
      :data="stat"
      :loading="isLoading">
    </traffic-chart-stat>

    <div class="navbar">
      <router-link
        class="back"
        :to="backLink">
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
import Api from '@/api'
import TrafficStat from '@/components/Traffic/Stat'
import TrafficChartStat from '@/components/Traffic/Chart/Stat'

export default {
  props: ['profile'],
  components: {
    TrafficStat,
    TrafficChartStat
  },

  data () {
    return {
      stat: [],
      isLoading: false
    }
  },

  computed: {
    query () {
      return this.$route.query
    },

    userId () {
      return this.query && this.query.userId
    },

    backLink () {
      if (this.userId) {
        return {
          name: 'user-detail',
          params: {
            userId: this.userId
          }
        }
      }
      return {
        name: 'profile'
      }
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api('/api/traffic/stat', {
        query: this.query
      }).then(({data}) => {
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
