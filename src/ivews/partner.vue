<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <el-form :model="form" ref="form">
            <el-form-item label="合伙人账号" prop="username" class="signed">
                <el-input v-model="form.username" placeholder="请输入您需邀请的合伙人账号"></el-input>
            </el-form-item>
            
            <p style="color:white">合伙人手机号码</p>
            <div class="custom">
                <el-form-item class="custom-one">
                    <el-select v-model="form.value" @change="change()" >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="mobile" class="signed custom-two">
                    <el-input v-model="form.mobile" placeholder="请输入您合伙人的手机号码"></el-input>
                </el-form-item>
            </div>
            <p style="color:white">签约合伙人</p>
            <el-form-item class="signed">
                <el-select v-model="form.type" placeholder="" class="special" @change="selected()">
                    <el-option v-for="list in lists" :key="list.value" :label="list.label" :value="list.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="安置用户" prop="account" class="signed">
                <el-input v-model="form.account" placeholder="请输入安置人账号"></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit">确认</el-button>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url:'/my',
      message:'签约合伙人',
      href:'',
      classIcon:'',
      form:{
          username:'',
          value:1,
          type:1,
      },
      options:[
          {
              value:1,
              label:'中国 +86'
          },
          {
              value:2,
              label:'中国 +88'
          }
      ],
      lists:[
          {
              value:1,
              label:'自动小区深度'
          },
          {
              value:2,
              label:'手动小区深度'
          }
      ]
    };
  },
  mounted() {
      console.log(this.form.type)
  },
  methods: {
      change(){
          console.log(this.form.value)
      },
      selected(){
          console.log(this.form.type)
      }
  },
};
</script>

<style scoped>
</style>
