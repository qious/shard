<template>
  <div class="nodes-edit">
    <div class="weui-loadmore" v-show="isLoading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <div v-show="!isLoading">
      <div class="weui-cells__title">节点信息</div>
      <div class="weui-cells weui-cells_form weui-panel__bd">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">节点名称</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入节点名称" v-model="name">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">节点图标</label>
          </div>
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="请输入图标地址" rows="3" v-model="avatar"></textarea>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">节点描述</label>
          </div>
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="请输入节点描述" rows="3" v-model="description"></textarea>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">连接地址</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入服务器地址" v-model="server">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">加密方式</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入 SS 加密方式" v-model="method">
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">是否可见</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="isVisible">
              <option value="Y">可见</option>
              <option value="N">隐藏</option>
            </select>
          </div>
        </div>
        <div class="weui-cell" :class="{'weui-cell_warn': isSortError}">
          <div class="weui-cell__hd">
            <label class="weui-label">节点排序</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入排序 ID" v-model="sort">
          </div>
          <div class="weui-cell__ft" v-if="isSortError">
            <i class="weui-icon-warn"></i>
          </div>
        </div>
      </div>

    <div class="weui-btn-area">
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div
            class="weui-btn weui-btn_primary"
            :class="{'weui-btn_disabled': !isValid, 'weui-btn_loading': isValid && (isSubmit || isRemove)}"
            @click="submit()">
            <span v-if="isSubmit">
              <i class="weui-loading"></i> 保存中
            </span>
            <span v-else>保存</span>
          </div>
        </div>
        <div class="weui-flex__item" v-if="nodeId">
          <div
            class="weui-btn weui-btn_warn"
            :class="{'weui-btn_loading': isSubmit || isRemove}"
            @click="remove()">
            <span v-if="isRemove">
              <i class="weui-loading"></i> 删除中
            </span>
            <span v-else>删除</span>
          </div>
        </div>
        <div class="weui-flex__item" v-else>
          <router-link
            class="weui-btn weui-btn_default"
            :class="{'weui-btn_loading': isSubmit}"
            :to="{name: 'nodes'}">
            返回
          </router-link>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import {formatBoolean} from '../../libs/utils'

export default {
  data () {
    return {
      nodeId: null,
      name: null,
      avatar: null,
      description: null,
      server: null,
      method: null,
      isVisible: 'Y',
      sort: 1,
      isLoading: false,
      isSubmit: false,
      isRemove: false
    }
  },

  computed: {
    isSortError () {
      return this.sort && (isNaN(this.sort) || this.sort <= 0)
    },
    isValid () {
      return this.name && this.avatar && this.description && this.server &&
             this.method && this.isVisible && this.sort && !this.isSortError
    }
  },

  created () {
    this.nodeId = this.$route.params.nodeId
    if (this.nodeId) {
      this.fetch()
    }
  },

  methods: {
    fetch () {
      this.isLoading = true
      let nodeId = this.nodeId
      Api('/api/nodes/detail', {query: {nodeId}}).then(({data}) => {
        this.isLoading = false
        this.name = data.name
        this.avatar = data.avatar
        this.description = data.description
        this.server = data.server
        this.method = data.method
        this.isVisible = formatBoolean(data.isVisible, true)
        this.sort = data.sort
      }).catch(() => {
        this.isLoading = false
      })
    },

    submit () {
      if (!this.isValid || this.isSubmit || this.isRemove) {
        return false
      }
      this.isSubmit = true

      let method = 'POST'
      let body = {
        name: this.name,
        avatar: this.avatar,
        description: this.description,
        server: this.server,
        method: this.method,
        isVisible: formatBoolean(this.isVisible),
        sort: this.sort
      }
      if (this.nodeId) {
        method = 'PUT'
        body.nodeId = this.nodeId
      }

      Api('/api/nodes', {method, body}).then(({data}) => {
        this.isSubmit = false
        this.$router.push({name: 'node-detail', params: {nodeId: data.nodeId}})
      }).catch(() => {
        this.isSubmit = false
      })
    },

    remove () {
      if (this.isSubmit || this.isRemove) {
        return false
      } else if (!confirm('你确定要删除当前节点吗?')) {
        return false
      }

      this.isRemove = true
      let nodeId = this.nodeId
      Api('/api/nodes', {method: 'DELETE', query: {nodeId}}).then(() => {
        this.isRemove = false
        this.$router.push({name: 'nodes'})
      }).catch(() => {
        this.isRemove = false
      })
    }
  }
}
</script>

<style lang="less">
.nodes-edit {
  .weui-cell .weui-cell__ft {
    font-size: 1em;
  }

  .weui-btn {
    margin: 0 5px;
    &:after {
      border: 0px;
    }
  }
}
</style>
