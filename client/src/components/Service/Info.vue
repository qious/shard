<template>
  <div class="comp-service-info">
    <div class="weui-panel__hd">{{title}}</div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>SS 端口</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.port}}</span>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>SS 密码</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-loading" v-if="loading"></i>
              <span v-else>{{user.password}}</span>
            </div>
          </div>
          <router-link
            class="weui-cell weui-cell_access weui-cell_link"
            :to="{name: 'profile-edit'}">
            <div class="weui-cell__bd">修改配置</div>
            <span class="weui-cell__ft"></span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'user', 'loading']
}
</script>
