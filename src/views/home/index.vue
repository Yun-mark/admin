<template>
  <div class="home-container">
    <el-card class="text">欢迎来到科技头条管理系统！</el-card>
    <el-card class="pic">
      <i class="el-icon-s-custom"></i>
      <i class="el-icon-s-tools"></i>
      <i class="el-icon-menu"></i>
      <i class="el-icon-document"></i>
      <i class="el-icon-edit"></i>
      <i class="el-icon-s-comment"></i>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.text{
  font-size: 30px;
  color: #fff;
  background-color: #19365e;
  border-radius: 10px;
  text-align:center;
  margin: 0 auto;
  width: 700px;
  margin-bottom: 15px;
}
.pic{
  text-align:center;
  width: 600px;
  margin: 0 auto;
  background-color: #19365e;
  color: #fff;
  font-size: 100px;
}
</style>
