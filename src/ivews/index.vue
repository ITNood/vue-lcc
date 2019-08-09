<template>
  <div class="home" 
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="content">
      <div style="padding:0 50px;">
        <img src="../assets/img/market1.png">
        <h4>The world's first</h4>
        <h4>decentralized travel</h4>
        <h4>payment</h4>
        <i></i>
        <p>FC.COIN</p>

        <router-link
          to="/lang"
          class="into"
        ><i></i></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:true
    };
  },
 
  mounted() {
    console.log(123)
    this.loading=false
    let token=window.localStorage.getItem('token')
    if(token){
      this.$router.push('/home')
    }
  },
};
</script>

<style scoped>
</style>
