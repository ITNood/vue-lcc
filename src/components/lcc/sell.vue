<template>
  <div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="85%"
      center
      :close-on-click-modal="false"
      class="lccOpen"
    >
      <p>您将委托平台出售FC</p>
      <p>交易完成将扣除5%作为手续费</p>
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
      
      <div class="selectsell">
        <p style="margin-bottom:10px;">收款方式:</p>
        <el-radio v-model="radio" label="1" border><i class="icon iconfont icon-yinhangqia"></i>场外收款</el-radio>
        <el-radio v-model="radio" label="2" border><i class="icon iconfont icon-meiyuan8"></i>收款</el-radio>
      </div>
      <el-button
        class="submit"
        style="background:#05cf7f"
        @click="sell()"
      >买入</el-button>
      <ul class="know">
        <p>交易须知</p>
        <li>*提交后由平台进行撮合式交易</li>
        <li>*卖出根据等价值兴源通宝</li>
        <li>*其中一份兴源通宝等于50美金</li>
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
  //props: ['centerData'],
  data() {
    return {
      centerDialogVisible:false,
      num1: 1,
      price1: "0.00",
      total1: "0.00",
      radio:'2'
    };
  },
  methods: {
    handleChange1(value) {
      console.log(value);
    },
    sell(flag){
      this.centerDialogVisible=!this.centerDialogVisible
    }
  },
};
</script>

<style scoped>
</style>
