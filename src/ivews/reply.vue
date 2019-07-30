<template>
  <div>
    <!-- <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    /> -->
    <el-header
      height="50px"
      id="top"
    >
      <el-col :span="6">
        <a
          class="el-icon-arrow-left back"
          @click="back()"
        ></a>
      </el-col>
      <el-col :span="12">
        <h5 style="height:50px;">{{title}}</h5>
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-header>
    <div class="container">
      <el-form
        :model="form"
        ref="form"
        class="submitReport"
      >
        <el-form-item
          :label="$t('message.title')"
          prop="title"
        >
          <el-input
            :placeholder="$t('message.thetitle')"
            v-model="form.title"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('message.problem')"
          prop="detail"
        >
          <el-input
            type="textarea"
            :placeholder="$t('message.question')"
            v-model="form.detail"
          ></el-input>
        </el-form-item>
        <div class="downloadImg">
          <input
            type="file"
            name="img"
            @change="upload($event)"
          >
          <img
            :src="imgSrc"
            v-if="imgSrc"
          >
          <div
            class="uploadText"
            v-else
          >
            <i class="el-icon-plus"></i>
            <p>{{$t('message.download')}}</p>
          </div>
        </div>
      </el-form>
      <el-button
        class="submit"
        @click="submit()"
        v-if="show"
      >{{$t('message.confirm')}}</el-button>
      <el-button v-else class="submit" @click="submit1()">{{$t('message.confirm')}}</el-button>
    </div>
  </div>
</template>

<script>
import api from "../API/index";
export default {
  components: {},
  data() {
    return {
      title: "",
      form: {
        detail: "",
        img: "",
        title: "",
        id:''
      },
      imgSrc: "",
      show:true
    };
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.title = this.$t('message.workreply');
      this.show=false
    } else {
      this.title =this.$t('message.work');
      this.show=true
    }
  },
  methods: {
    upload(ev) {
      var file = ev.target.files[0];
      let that = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function(e) {
          // 图片base64
          console.log(e);
          //console.log(e.target.value);
          that.imgSrc = e.target.result;
          that.form.img = e.target.result;
          // console.log(that.imageUrl);
        };
      }
    },
    back() {
      this.$router.go(-1);
    },
    submit() {
      let that = this;
      let data = that.form;
      api.minicart.template
        .choices("feedback", data)
        .then(result => {
          if (result.status == 200) {
            alert(result.msg);
            that.$router.push("/report");
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(that.$t('message.error'));
        });
    },
    submit1(){
      let that=this
      let id=that.$route.query.id
      that.form.id=id
      let data=that.form
      api.minicart.template.choices('feedbackReply',data).then(result=>{
        if(result.status==200){
          alert(result.msg)
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(that.$t('message.error'))
      })
    }
  }
};
</script>

<style scoped>
</style>
