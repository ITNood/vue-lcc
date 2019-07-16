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
  data() {
    return {};
  },
  mounted() {
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value)
        ]
      };
    }

    var data = [];
    var now = new Date();
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }
    let myChart = this.$echarts.init(document.getElementById("myCharts"));
    const option = {
      tooltip: {
        trigger: "axis",
        // formatter: function (params) {
        //     params = params[0];
        //     var date = new Date(params.name);
        //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        // },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#999999" //这里用参数代替了
          }
        }
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#999999" //这里用参数代替了
          }
        }
      },
      series: [
        {
          name: "模拟数据",
          type: "line",
          showSymbol: false,
          hoverAnimation: false,
          data: data,
          itemStyle: {
            normal: {
              color: "#ffffff"
            }
          }
        }
      ]
    };
    myChart.setOption(option);

    setInterval(function() {
      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }

      myChart.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    }, 1000);
  }
};
</script>

<style scoped>
</style>
