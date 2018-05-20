<template>
  <div class="node-detail">
    <traffic-chart-stat
      :data="stat"
      :loading="isLoading.stat">
    </traffic-chart-stat>

    <div class="navbar">
      <router-link class="back" :to="{name: 'nodes'}">
        <i class="fa fa-angle-left fa-lg"></i>
      </router-link>
      <router-link class="edit" :to="{name: 'node-edit'}">
        <i class="fa fa-edit fa-lg"></i>
      </router-link>
    </div>

    <div class="weui-panel">
      <div class="weui-panel__hd">节点信息</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>节点ID</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading.node"></i>
                <span v-else>{{node.nodeId}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>节点名称</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading.node"></i>
                <span v-else>{{node.name}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>节点地址</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading.node"></i>
                <span v-else>{{node.server}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>加密方式</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading.node"></i>
                <span v-else>{{node.method}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>节点描述</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading.node"></i>
                <span v-else>{{node.description}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>更新时间</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading.node"></i>
                <span v-else>{{fromNow(node.updatedAt)}}</span>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>创建时间</p>
              </div>
              <div class="weui-cell__ft">
                <i class="weui-loading" v-if="isLoading.node"></i>
                <span v-else>{{fromNow(node.createdAt)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <node-users
        :loading="isLoading.users"
        :users="users">
      </node-users>
      <traffic-stat
        :loading="isLoading.stat"
        :stat="stat"
        :fold="true">
      </traffic-stat>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import NodeUsers from '@/components/Node/Users'
import TrafficStat from '@/components/Traffic/Stat'
import TrafficChartStat from '@/components/Traffic/Chart/Stat'
import { fromNow } from '@/libs/utils'

export default {
  props: ['profile'],
  components: {
    NodeUsers,
    TrafficStat,
    TrafficChartStat
  },

  data () {
    return {
      node: {},
      users: [],
      stat: [],
      isLoading: {
        node: false,
        stat: false,
        users: false
      }
    }
  },

  computed: {
    nodeId () {
      return this.$route.params.nodeId
    }
  },

  created () {
    this.fetchNode()
    this.fetchUsers()
    this.fetchStat()
  },

  methods: {
    fetchNode () {
      this.isLoading.node = true
      Api(`/api/nodes/${this.nodeId}`).then(({ data }) => {
        this.isLoading.node = false
        this.node = data
      }).catch(() => {
        this.isLoading.node = false
      })
    },

    fetchUsers () {
      this.isLoading.users = true
      Api('/api/traffic/users', {
        query: {
          nodeId: this.nodeId
        }
      }).then(({ data }) => {
        this.isLoading.users = false
        this.users = data
      }).catch(() => {
        this.isLoading.users = false
      })
    },

    fetchStat () {
      this.isLoading.stat = true
      Api('/api/traffic/stat', {
        query: {
          nodeId: this.nodeId
        }
      }).then(({ data }) => {
        this.isLoading.stat = false
        this.stat = data
      }).catch(() => {
        this.isLoading.stat = false
      })
    },

    fromNow
  }
}
</script>

<style lang="less">
.node-detail {
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
