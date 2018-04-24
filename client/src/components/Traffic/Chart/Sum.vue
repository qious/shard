<template>
  <div class="comp-traffic-chart-sum">
    <background></background>
    <div class="traffic">
      <e-charts :options="options"></e-charts>
      <div class="value">
        {{(user.trafficUsedV || '0 B') + ' / ' + (user.trafficEnableV || '0 B')}}
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts-liquidfill'
import Background from '../../Background'
import {getTrafficPercent} from '../../../libs/utils'

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

  created () {
    if (this.user.trafficEnable || this.user.trafficUsed) {
      this.updateChart()
    }
  },

  methods: {
    updateChart () {
      let trafficEnable = this.user.trafficEnable
      let trafficUsed = this.user.trafficUsed
      let trafficPercent = getTrafficPercent(trafficEnable, trafficUsed)
      this.options.series.data = [trafficPercent]
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
