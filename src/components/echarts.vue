<template>
  <div>
    <div
      id="myCharts"
      :style="{width:'100%',height:'300px'}"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  props:['time','data','min','max'],
  data() {
    return {};
  },
  watch: {
    time: function (newtime, oldtime) {
    let myChart = this.$echarts.init(document.getElementById("myCharts"));
    const option = {
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        data:eval(this.time),
        axisLine: {
          lineStyle: {
            color: "#999"
          }
        }
      },
      yAxis: {
        type: "value",
        min: this.min,
        max:this.max,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#999"
          }
        }
      },
      series: [
        {
          data:eval(this.data),
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "#2059ff", //折点颜色
              lineStyle: {
                color: "#2059ff" //折线颜色
              }
            }
          }
        }
      ]
    };
    myChart.setOption(option);
    }
  },  
  mounted() {

   
  }
};
</script>

<style scoped>
</style>
