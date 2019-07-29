<template>
  <div class="home">
    <!-- <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
        style="height:100vh"
      >
      </vue-particles> -->
    <div class="content">
      <div style="padding:0 50px;">
        <img src="../assets/img/logo.png">
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

    };
  },
  mounted() {
    let token=window.localStorage.getItem('token')
    if(token){
      this.$router.push('/home')
    }
  },
};
</script>

<style scoped>
</style>
