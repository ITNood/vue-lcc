<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div
      class="container"
      style="margin-bottom:0"
    >
      <div class="transfer">
        <ul class="transferHistry">
          <li
            v-for="(item,index) in items"
            :key="index"
          >
            <p>{{item.date}}</p>
            <h5>{{item.detail}}</h5>
            <!-- <span :style="{color:(item.state=1 ? '#05ce7e':'#e53c1d')}">{{item.state=1 ? '+':'-'}}{{item.amount}}</span> -->
            <span v-if="item.state==1" style="color:#05ce7e">+{{item.amount}}</span>
            <span v-else style="color:#e53c1d">-{{item.amount}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../API/index";
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/assets",
      message: this.$t("message.bagHistry"),
      href: "",
      classIcon: "",
      items: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      let id = that.$route.query.id;
      api.minicart.template
        .choices("balanceRecord", { id: id })
        .then(result => {
          if (result.status == 200) {
            that.items = that.items.concat(result.res.data);
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(this.$t("message.error"));
        });
    }
  }
};
</script>

<style scoped>
</style>
