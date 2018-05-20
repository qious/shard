<template>
  <div class="comp-user-info">
    <div class="weui-panel__hd">个人信息</div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>用户名</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.username}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>用户昵称</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.nickname}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>用户状态</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.isLocked? '锁定' : '正常'}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>用户角色</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.isAdmin? '管理员' : '用户'}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>在线时间</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.activedAt ? fromNow(user.activedAt) : '从未使用'}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>加入时间</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{fromNow(user.createdAt)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNow } from '@/libs/utils'

export default {
  props: ['user', 'loading'],

  methods: {
    fromNow
  }
}
</script>
