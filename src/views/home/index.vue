<template>
  <div class="home-container">
    <el-card class="text">科技，让管理更高效
      <div class="pic"><i class="el-icon-s-operation" :style="{color:iconColor6}"></i></div>
    </el-card>
    <div class="head">
      <el-card class="write"><i class="el-icon-circle-plus" :style="{color:iconColor5}"></i>
         <span>发布文章</span><p>快捷的图文编辑工具,编辑完成后可以选择发布或存入草稿</p>
      </el-card>
      <el-card class="about">
        <span>关于我们<i class="el-icon-arrow-right"></i></span>
      </el-card>
    </div>
    <div class="mid">
      <el-card class="quarter-div">
        <div class="photo"><i class="el-icon-menu" :style="{color:iconColor1}" type="primary"></i></div>
        <div class="txt">内容管理</div>
      </el-card>
      <el-card class="quarter-div">
        <div class="photo"><i class="el-icon-document" :style="{color:iconColor2}"></i></div>
        <div class="txt">素材管理</div>
      </el-card>
      <el-card class="quarter-div">
        <div class="photo"><i class="el-icon-s-custom" :style="{color:iconColor3}"></i></div>
        <div class="txt">粉丝管理</div>
      </el-card>
      <el-card class="quarter-div">
        <div class="photo"><i class="el-icon-s-comment" :style="{color:iconColor4}"></i></div>
        <div class="txt">评论管理</div>
      </el-card>
    </div>
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
      iconColor6: 'gray'
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.text{
  font-size: 30px;
  border-radius: 10px;
  text-align:center;
  margin: 0 auto;
  margin-bottom: 15px;
  background: url('../../assets/bg.jpg') no-repeat;
  background-size: cover;
}
.head {
  width: 100%;
  display: table;
  margin-top: 2%;
  text-align: center;
  .el-icon-circle-plus{
    font-size: 80px;
  }
}
.write {
  width: 40%;
  height: 150px;
  display:inline-block;
  span {
    font-size: 25px;
    margin-left: 30px;
  }
}
.about{
  width: 20%;
  height: 150px;
  display:inline-block;
  margin-left: 1.5%;
  line-height: 100px;
  span {
    font-size: 25px;
  }
}

.mid{
   width:100%;
   display: table;
   position: absolute;
   .quarter-div{
    float: left;
    width:20%;
    margin-left: 1.5%;
    margin-top: 1.5%;
    text-align: center;
  }
  .photo{
    font-size: 70px;
  }
  .txt{
    margin-top: 5%;
    font-size: 20px;
  }
}

</style>
