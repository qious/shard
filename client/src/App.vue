<template>
  <div class="app weui-tab">
    <div
      class="weui-tab__panel"
      :style="{'padding-bottom': tabberShow? '50px':'0'}">
      <router-view
        :profile="profile"
        @profileUpdate="fetchProfile()">
      </router-view>
    </div>
    <div class="weui-tabbar" v-show="tabberShow">
      <router-link
        class="weui-tabbar__item"
        :class="tabberClass[0]"
        :to="{name: 'services'}">
        <i class="fa fa-paper-plane weui-tabbar__icon"></i>
        <p class="weui-tabbar__label">服务</p>
      </router-link>
      <router-link
        class="weui-tabbar__item"
        :class="tabberClass[1]"
        :to="{name: 'profile'}">
        <i class="fa fa-user weui-tabbar__icon"></i>
        <p class="weui-tabbar__label">我</p>
      </router-link>
      <router-link
        class="weui-tabbar__item"
        :class="tabberClass[2]"
        :to="{name: 'users'}"
        v-if="profile.isAdmin">
        <i class="fa fa-users weui-tabbar__icon"></i>
        <p class="weui-tabbar__label">用户</p>
      </router-link>
      <router-link
        class="weui-tabbar__item"
        :class="tabberClass[3]"
        :to="{name: 'nodes'}"
        v-if="profile.isAdmin">
        <i class="fa fa-sitemap weui-tabbar__icon"></i>
        <p class="weui-tabbar__label">节点</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  data () {
    return {
      profile: {},
      tabberShow: false,
      tabberClass: []
    }
  },

  created () {
    this.updateTabber()
    this.fetchProfile()
  },

  methods: {
    fetchProfile () {
      Api('/api/profile').then(({data}) => {
        this.profile = data
      })
    },

    updateTabber () {
      let now = this.$route.name
      let tabbers = ['services', 'profile', 'users', 'nodes']

      if (tabbers.indexOf(now) === -1) {
        this.tabberShow = false
        return
      }

      this.tabberShow = true
      for (let i = 0; i < tabbers.length; i++) {
        if (now === tabbers[i]) {
          this.tabberClass[i] = ['weui-bar__item_on']
        } else {
          this.tabberClass[i] = []
        }
      }
    }
  },

  watch: {
    $route () {
      this.updateTabber()
    }
  }
}
</script>

<style lang="less">
.app {
  &.weui-tab {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
  }
}
</style>
