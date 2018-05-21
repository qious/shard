<template>
  <div class="user-detail">
    <traffic-chart-sum :user="user"></traffic-chart-sum>

    <div class="navbar">
      <router-link class="back" :to="{name: 'users'}">
        <i class="fa fa-angle-left fa-lg"></i>
      </router-link>
      <router-link class="edit" :to="{name: 'user-edit'}">
        <i class="fa fa-edit fa-lg"></i>
      </router-link>
    </div>

    <div class="weui-panel">
      <traffic-info
        :user="user"
        :loading="isLoading"
        :isprofile="false">
      </traffic-info>

      <service-info
        :user="user"
        :loading="isLoading"
        :isprofile="false">
      </service-info>

      <user-info
        :user="user"
        :loading="isLoading">
      </user-info>
    </div>

  </div>
</template>

<script>
import Api from '@/api'
import TrafficChartSum from '@/components/Traffic/Chart/Sum'
import TrafficInfo from '@/components/Traffic/Info'
import ServiceInfo from '@/components/Service/Info'
import UserInfo from '@/components/User/Info'

export default {
  props: ['profile'],
  components: {
    TrafficChartSum,
    TrafficInfo,
    ServiceInfo,
    UserInfo
  },

  data () {
    return {
      user: {},
      isLoading: false
    }
  },

  computed: {
    userId () {
      return this.$route.params.userId
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api(`/api/users/${this.userId}`).then(({ data }) => {
        this.isLoading = false
        this.user = data
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="less">
.user-detail {
  position: relative;

  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    .back, .edit {
      position: absolute;
      top: 15px;
      color: #fff;
    }
    .back {
      left: 15px;
    }
    .edit {
      right: 15px;
    }
  }

  .weui-panel {
    margin-top: 0;
  }
}
</style>
