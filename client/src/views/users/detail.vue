<template>
  <div class="detail">
    <transfer-chart-sum :user="user"></transfer-chart-sum>

    <div class="navbar">
      <router-link class="back" :to="{name: 'users'}">
        <i class="fa fa-angle-left fa-lg"></i>
      </router-link>
      <router-link class="edit" :to="{name: 'user-edit'}">
        <i class="fa fa-edit fa-lg"></i>
      </router-link>
    </div>

    <div class="weui-panel">
      <transfer-info
        :user="user"
        :loading="isLoading"
        :isprofile="false">
      </transfer-info>

      <div class="weui-panel__hd">服务信息</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>SS 端口</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.port}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>SS 密码</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.password}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="weui-panel__hd">个人信息</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>用户账号</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.userId}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>用户姓名</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.name}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>用户状态</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.isLocked? '锁定' : '正常'}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>用户角色</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.isAdmin? '管理员' : '用户'}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>最后在线</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.activeAt}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>加入时间</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading"></i>
                <span v-else>{{user.registAt}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import TransferChartSum from '../../components/Transfer/Chart/Sum'
import TransferInfo from '../../components/Transfer/Info'

export default {
  props: ['profile'],
  components: {
    TransferChartSum,
    TransferInfo
  },

  data () {
    return {
      user: {},
      userId: null,
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
      let userId = this.userId
      Api('/api/users/detail', {query: {userId}}).then(({data}) => {
        this.isLoading = false
        this.user = data
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.detail {
  position: relative;
}
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.navbar .back,
.navbar .edit {
  position: absolute;
  top: 15px;
  color: #fff;
}
.navbar .back {
  left: 15px;
}
.navbar .edit {
  right: 15px;
}
.weui-panel {
  margin-top: 0;
}
</style>
