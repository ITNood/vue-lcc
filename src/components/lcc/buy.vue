<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      center
      :close-on-click-modal="false"
      class="lccOpen"
    >
      <p>您将委托平台购买LCC</p>
      <p>买入无需手续费</p>
      <b></b>
      <ul class="lccList">
        <li>
          <p>交易份额</p>
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
          ></el-input-number>
        </li>
        <li>
          买入单价：
          <span style="right:8px">${{price}}</span>
        </li>
        <li>
          买入总额：
          <span style="right:8px">${{total}}</span>
        </li>
      </ul>
      <el-button
        class="submit"
        style="background:#e43c1d"
        @click="buy()"
      >买入</el-button>
      <ul class="know">
        <p>交易须知</p>
        <li>*提交后由平台进行撮合式交易</li>
        <li>*买入支付方式暂时仅限兴源通宝</li>
        <li>*买入份额根据等价值兴源通宝</li>
      </ul>
      <!-- <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >确 定</el-button>
      </span> -->
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Buy",
  props:['dialogVisible'],
  data() {
    return {
      num: 1,
      price: "0.00",
      total: "0.00"
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    buy(){
      this.dialogVisible=false
    }
  }
};
</script>

<style scoped>
</style>
