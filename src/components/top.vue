<template>
    <el-header
      height="50px"
      id="top"
    >
      <el-col :span="3">
        <router-link
          :to="pathUrl"
          class="el-icon-arrow-left back"
        ></router-link>
      </el-col>
    </el-header>
</template>

<script>
export default {
  name: "Top",
  props:['pathUrl'],
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
