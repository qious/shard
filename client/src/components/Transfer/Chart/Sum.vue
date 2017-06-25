<template>
  <div>
    <background></background>
    <div class="transfer">
      <e-charts :options="options"></e-charts>
      <div class="value">
        {{(user.transferUsedV || '0 B') + ' / ' + (user.transferEnableV || '0 B')}}
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts-liquidfill'
import Background from '../../Background'
import {getTransferPercent} from '../../../libs/utils'

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
    if (this.user.transferEnable || this.user.transferUsed) {
      this.updateChart()
    }
  },

  methods: {
    updateChart () {
      let transferEnable = this.user.transferEnable
      let transferUsed = this.user.transferUsed
      let transferPercent = getTransferPercent(transferEnable, transferUsed)
      this.options.series.data = [transferPercent]
    }
  },

  watch: {
    user () {
      this.updateChart()
    }
  }
}

</script>

<style scoped>
.transfer {
  width: 100%;
  height: 230px;
  margin-top: -230px;
  text-align: center;
  position: relative;
}
.transfer > .echarts {
  width: 200px;
  height: 200px;
  margin: auto;
}
.transfer > .value {
  margin-top: -18px;
  font-size: 18px;
  font-weight: 300;
  color: #fff;
}
</style>
