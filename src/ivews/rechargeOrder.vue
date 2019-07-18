<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <div id="order">
            <ul class="orderList">
                <li>
                    <router-link to=''>
                        <div class="status">
                            <h5>{{amount}}Usdt</h5>
                        </div>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <div class="orderContent">
                                    <p>时间</p>
                                    <dd>{{date}}</dd>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="orderContent textRight">
                                    <p>充值总额Usdt / Rmb</p>
                                    <dd>${{dollar}} / ￥{{rmb}}</dd>
                                </div>
                            </el-col>
                        </el-row>
                    </router-link>
                </li>
            </ul>
        </div>
        <!--订单详情-->
        <div class="orderText">
            <ul class="public">
                <li>
                    订单编号<span>{{order}}</span>
                </li>
                <li>
                    会员昵称<span>{{username}}</span>
                </li>
                <li>
                    打款类型
                    <span>
                        <el-select v-model="value" class="selectPay" @change="change" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </span>
                </li>
            </ul>
            <ul class="public">
                <li>
                    开户姓名<span>{{name}}</span>
                </li>
                <li>
                    银行名称<span>{{bank}}</span>
                </li>
                <li>
                    银行账号<span>{{account}}</span>
                </li>
                <li>
                    银行支行<span>{{bankAddress}}</span>
                </li>
            </ul>
        </div>

        <!--上传凭证-->
        <div class="download">
            <div class="downloadContent">
                <input
              name="img"
              type="file"
              @change="uploadChange($event)"
            >
                <img :src="img" v-if="img">
                <div v-else class="addPicture">
                    <div style="margin:0 auto;">
                        <i class="el-icon-plus"></i>
                        <p>上传凭证</p>
                    </div>
                </div>
            </div>
        </div>
        <el-button class="submit" :disabled="disabled">确认打款</el-button>
    </div>
 </div>
</template>

<script>
import Top from '../components/top'
export default {
    components:{
        Top
    },
 data() {
  return {
      url: "/outRecharge",
      message: "充值订单",
      href: "/chat",
      classIcon: "el-icon-chat-dot-square",
      amount:100,
      date:'2019/07/17',
      dollar:0,
      rmb:0,
      order:16165156,
      username:'张三',
      options:[],
      value:'',
      name:'赵四',
      bank:'招商银行',
      account:'62200000000000000000000000000',
      bankAddress:'益田支行',
      img:'',
      disabled:true,
  }
 },
 methods: {
     change(val){
         console.log(val)
     },

     uploadChange(ev) {//上传凭证
      var file = ev.target.files[0];
      let that = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function(e) {
          // 图片base64
          that.img = e.target.result;
         // that.ruleForm.img = e.target.result;
        };
      }
    },
 },
}
</script>

<style scoped>
#order .orderList{
    height: 106px !important;
}
</style>
