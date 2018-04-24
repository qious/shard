<template>
  <div class="comp-traffic-chart-stat">
    <background></background>
    <div class="traffic">
      <e-charts :options="options" v-if="options"></e-charts>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/dataZoom'

import Background from '@/components/Background'

export default {
  props: ['data', 'loading'],
  components: {
    ECharts,
    Background
  },

  data () {
    return {
      options: null
    }
  },

  created () {
    this.updateChart()
  },

  methods: {
    updateChart () {
      if (this.loading) {
        return false
      }

      let date = []
      let data = []
      for (let item of this.data) {
        date.push(item.date)
        data.push(_.round((item.flowUp + item.flowDown) / 1073741824, 2))
      }

      let dataShadow = _.fill(Array(this.data.length), _.ceil(_.max(data)))

      this.options = {
        xAxis: [{
          type: 'category',
          data: date,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        }],
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          splitLine: {
            show: false
          }
        },
        dataZoom: [{
          type: 'inside'
        }],
        series: [{
          // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'rgba(54, 162, 235, 0.8)'
            },
            emphasis: {
              color: 'rgba(54, 162, 235, 1)'
            }
          },
          data: data
        }]
      }
    }
  },

  watch: {
    data () {
      this.updateChart()
    }
  }
}

</script>

<style lang="less">
.comp-traffic-chart-stat {
  .traffic {
    width: 100%;
    height: 230px;
    margin-top: -230px;
    text-align: center;
    position: relative;
  }
  .traffic > .echarts {
    width: 100%;
    height: 100%;
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
