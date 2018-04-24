<template>
  <div class="comp-traffic-chart-sum">
    <background></background>
    <div class="traffic">
      <e-charts :options="options"></e-charts>
      <div class="value">
        {{filesize(trafficUsed || 0) + ' / ' + filesize(trafficLimit || 0)}}
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import filesize from 'filesize'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts-liquidfill'

import Background from '@/components/Background'

export default {
  props: ['user'],
  components: {
    ECharts,
    Background
  },

  data () {
    return {
      options: {
        series: {
          type: 'liquidFill',
          color: ['#36A2EB'],
          data: [0],
          outline: {
            show: false
          },
          label: {
            normal: {
              textStyle: {
                fontSize: 22,
                fontWeight: 400,
                color: '#36A2EB'
              }
            }
          }
        }
      }
    }
  },

  computed: {
    trafficLimit () {
      if (!this.user) {
        return 0
      }
      return this.user.trafficLimit || 0
    },

    trafficUsed () {
      if (!this.user) {
        return 0
      }
      return (this.user.flowUp + this.user.flowDown) || 0
    },

    trafficPercent () {
      let unused = this.trafficLimit - this.trafficUsed
      if (unused < 0 || this.trafficLimit <= 0) {
        return 0
      }
      return _.round(unused / this.trafficLimit, 4)
    }
  },

  created () {
    if (this.user.trafficLimit) {
      this.updateChart()
    }
  },

  methods: {
    filesize,

    updateChart () {
      this.options.series.data = [this.trafficPercent]
    }
  },

  watch: {
    user () {
      this.updateChart()
    }
  }
}

</script>

<style lang="less">
.comp-traffic-chart-sum {
  .traffic {
    width: 100%;
    height: 230px;
    margin-top: -230px;
    text-align: center;
    position: relative;
  }
  .traffic > .echarts {
    width: 200px;
    height: 200px;
    margin: auto;
  }
  .traffic > .value {
    margin-top: -18px;
    font-size: 18px;
    font-weight: 300;
    color: #fff;
  }
}
</style>
