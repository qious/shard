<template>
  <div class="transfer">
    <transfer-chart-stat
      :data="stat"
      :loading="isLoading">
    </transfer-chart-stat>

    <div class="navbar">
      <router-link
        class="back"
        :to="{name: userId? 'user-detail' : 'profile'}">
        <i class="fa fa-angle-left fa-lg"></i>
      </router-link>
    </div>

    <div class="weui-panel">
      <transfer-stat
        :loading="isLoading"
        :stat="stat">
      </transfer-stat>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import TransferStat from '../../components/Transfer/Stat'
import TransferChartStat from '../../components/Transfer/Chart/Stat'

export default {
  props: ['profile'],
  components: {
    TransferStat,
    TransferChartStat
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
      Api('/api/transfer/stat', {query}).then(({data}) => {
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
.transfer {
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
