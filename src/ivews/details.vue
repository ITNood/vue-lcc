<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container" style="margin-bottom:0;">
        <div class="news">
            <div class="newsList">
                <div class="newsTitle">
                    <p>{{date}}</p>
                    <h5>{{title}}</h5>
                </div>
                <div class="newsFont" v-html="details">{{details}}</div>
            </div>
        </div>
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
      url: "/news",
      message: "私人信箱",
      href: "",
      classIcon: "",
      date:'2019/07/18',
      title:'新闻标题',
      details:''
  }
 }
}
</script>

<style scoped>

</style>
