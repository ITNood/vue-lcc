<template>
  <div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="100%"
      center
      id="pin"
    >

      <div class="pay-tool">
        <div class="pay-tool-title border-bottom">
          <span
            class="icon1 icon-back"
          ></span>
        </div>
        <!--密码输入框-->
        <div class="pay-tool-content">
          <div class="pay-tool-inputs">
            <div
              class="item"
              v-for="i in items"
              :key="i"
            ><span
                class="icon_dot"
                v-if="password[i]"
              ></span></div>
          </div>
        </div>
        <!--键盘-->
        <div class="pay-tool-keyboard">
          <ul>
            <li
              @click="keyUpHandle($event)"
              v-for="val in keys"
              :key="val"
            >
              {{ val }}
            </li>
            <li
              class="del"
              @click="delHandle"
            >
              <span class="icon-del el-icon-back"></span>
            </li>
          </ul>
        </div>
      </div>
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
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0];
export default {
  name: "Pin",
  //props:["amnout"],
  data() {
    return {
      centerDialogVisible: false,
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: []
    };
  },
  methods: {
    open(flag){
        this.centerDialogVisible=!this.centerDialogVisible
        this.clearPasswordHandle()

    },
    keyUpHandle(e) {
      let text = e.currentTarget.innerText;
      let len = this.password.length;
      if (!text || len >= 6) return;
      this.password.push(text);
      this.ajaxData();
    },
    //删除密码
    delHandle() {
      if (this.password.length <= 0) return false;
      this.password.shift();
    },
    ajaxData() {
      if (this.password.length >= 6) {
        let that = that;
        //输完密码后执行操作
        //输完密码之后，这里函数里提交
        
       let password=this.password.join("")
    // console.log(this.amnout)
        this.$emit('submit',password)

       this.centerDialogVisible=!this.centerDialogVisible
       this.clearPasswordHandle()
       //这里是
      }
      return false;
    },
    //清空密码
    clearPasswordHandle() {
      this.password = [];
    }
  }
};
</script>

<style scoped>

</style>
