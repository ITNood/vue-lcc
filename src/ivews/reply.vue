<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <el-form :model="form" ref="form" class="submitReport">
            <el-form-item label="问题描述" prop="text">
                <el-input type="textarea" placeholder="请输入您的问题描述" v-model="form.text"></el-input>
            </el-form-item>
            <div class="downloadImg">
                <input type="file" name="img" @change="upload($event)">
                <img :src="imgSrc" v-if="imgSrc">
                <div class="uploadText" v-else>
                    <i class="el-icon-plus"></i>
                    <p>上传截图</p>
                </div>
            </div>
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
      url: "/reportDetails",
      message: "",
      href: "",
      classIcon: "",
      form:{
          text:'',
          img:'',
          
      },
      imgSrc:''
    };
  },
  mounted() {
      let id=this.$route.query.id
      if(id){
          this.message='工单回复'
      }else{
          this.message='提交工单'
      }
  },
  methods: {
      upload(ev){
          var file = ev.target.files[0];
          let that = this;
          if (window.FileReader) {
             var reader = new FileReader();
             reader.readAsDataURL(file);
             //监听文件读取结束后事件
             reader.onloadend = function(e) {
              // 图片base64
              console.log(e)
              //console.log(e.target.value);
             that.imgSrc = e.target.result;
             that.form.img=e.target.result
             // console.log(that.imageUrl);
        };
      }
      }
  },
};
</script>

<style scoped>
</style>
