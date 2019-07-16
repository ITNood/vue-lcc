<template>
  <div>
    <el-dialog
      :visible.sync="centerDialogVisible"
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
            v-model="num1"
            @change="handleChange1"
            :min="1"
          ></el-input-number>
        </li>
        <li>
          买入单价：
          <span style="right:8px">${{price1}}</span>
        </li>
        <li>
          买入总额：
          <span style="right:8px">${{total1}}</span>
        </li>
      </ul>
      <el-button
        class="submit"
        style="background:#05cf7f"
        @click="sell()"
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
  name: "Sell",
  props:['centerDialogVisible'],
  data() {
    return {
      num1: 1,
      price1: "0.00",
      total1: "0.00"
    };
  },
  methods: {
    handleChange1(value) {
      console.log(value);
    },
    sell(){
      this.centerDialogVisible=false
    }
  }
};
</script>

<style scoped>
</style>
