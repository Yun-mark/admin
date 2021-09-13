<template>
  <div class="home-container">
    <el-card class="text">科技，让管理更高效
      <div class="pic"><i class="el-icon-s-operation" :style="{color:iconColor6}"></i></div>
    </el-card>
    <div class="head">
      <el-card class="write"><i class="el-icon-circle-plus" @click="$router.push('/publish')" :style="{color:iconColor5}"></i>
         <span>发布文章</span><p>快捷的图文编辑工具,编辑完成后可以选择发布或存入草稿</p>
      </el-card>
      <el-card class="about">
        <span>关于我们<i @click="drawer = true" style="margin-left: 16px;" class="el-icon-arrow-right"></i></span>
      </el-card>
    </div>
    <div class="mid">
      <el-card class="quarter-div" >
        <div class="photo"><i class="el-icon-menu" @click="$router.push('/article')" :style="{color:iconColor1}" type="primary"></i></div>
        <div class="txt">内容管理</div>
      </el-card>
      <el-card class="quarter-div">
        <div class="photo"><i class="el-icon-s-management" @click="$router.push('/image')" :style="{color:iconColor2}"></i></div>
        <div class="txt">素材管理</div>
      </el-card>
      <el-card class="quarter-div">
        <div class="photo"><i class="el-icon-s-custom" @click="$router.push('/fans')" :style="{color:iconColor3}"></i></div>
        <div class="txt">粉丝管理</div>
      </el-card>
      <el-card class="quarter-div">
        <div class="photo"><i class="el-icon-s-comment" @click="$router.push('/comment')" :style="{color:iconColor4}"></i></div>
        <div class="txt">评论管理</div>
      </el-card>
    </div>
    <el-drawer
    class="drawer"
   title="关于我们"
   model="false"
   :append-to-body="true"
  :visible.sync="drawer"
  :with-header="false">
  <div><h1>按下ESC键返回</h1></div>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随着智能手机的普及，人们更加习惯于通过手机来看新闻。由于生活节奏的加快，很多人只能利用碎片时间来获取信息，因此，对于移动资讯客户端的需求也越来越高。科技头条项目正是在这样背景下开发出来。本项目主要着手于获取最新最热新闻资讯，通过大数据分析用户喜好精确推送咨询新闻。</span>
  <ol>
    <li>基于 Vue.js 开发一个 PC 端内容发布系统，可以发布管理新闻文章内容。</li>
    <li>今日头条、网易新闻、腾讯新闻之类的咨询阅读软件，一般这种资讯类应用都有一个后台，专门用来给创作者发布内容。</li>
  </ol>
</el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {
      iconColor1: 'orange',
      iconColor2: 'green',
      iconColor3: '#00aaaa',
      iconColor4: '#8080ff',
      iconColor5: '#5cb6ff',
      iconColor6: 'gray',
      drawer: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="less" scoped>
.drawer{
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
  h1 {
    font-size: 30px;
  }
}
.home-container{
  opacity: 0.8;
  i:hover {
    cursor: pointer;
  }
}
.text{
  font-size: 30px;
  border-radius: 10px;
  text-align:center;
  margin: 0 auto;
  margin-bottom: 15px;
  background:transparent;
  font-weight: bold;
}
.head {
  width: 100%;
  display: table;
  margin-top: 5%;
  text-align: center;
  // margin-left: -1%;
  .el-icon-circle-plus{
    font-size: 80px;
  }
}
.write {
  width: 40%;
  height: 150px;
  display:inline-block;
  margin-left: 2.3%;
  span {
    font-size: 25px;
    margin-left: 30px;
    height: 30px;
    line-height: 80px;
    vertical-align:top;
    font-weight: bold;
  }
  p{
    color: gray;
    font-weight: bold;
  }
}

.about{
  width:24%;
  height: 150px;
  display:inline-block;
  line-height: 100px;
   margin-left: 1.4%;
  span {
    font-size: 25px;
    font-weight: bold;
  }
}

.mid{
   width:90%;
   display: inline-block;
   position: absolute;
   text-align: center;
   .quarter-div{
     display:inline-block;
    width:15%;
    text-align: center;
    margin-left: 1.5%;
    margin-top: 2%;
  }
  .photo{
    font-size: 70px;
  }
  .txt{
    margin-top: 5%;
    font-weight: bold;
    font-size: 20px;
  }
}

</style>
