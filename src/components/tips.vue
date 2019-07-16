<template>
  <div id="tips" v-show="show">
      <div class="centerContent">
          <div class="tipsContent">
              <div class="padding">
                  <i class="el-icon-success"></i>
                  <h5>恭喜</h5>
                  <p>{{text}}</p>
                  <el-button class="submit">确认</el-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Tips",
  props:['text','show'],
  data() {
    return {
        show:false
    };
  }
};
</script>

<style scoped>
</style>
