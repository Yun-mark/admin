<template>
  <div class="image-container">
      <el-card class="filter-card">
          <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="action-head">
          <el-radio-group v-model="collect" size="min" @change="onCollectChange">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
              <el-button class="btn" type="success">上传素材</el-button>
          </el-radio-group>
      </div>
      <el-row>
          <el-col :span="4" :gutter="20" :lg="4" :md="6" :xs="12" :sm="6"
          v-for="(img, index) in images" :key="index">
              <el-image style="height:100px" :src="img.url" fit="cover"></el-image>
          </el-col>
      </el-row>
      </el-card>
  </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      collect: false,
      images: [] // 图片列表
    }
  },
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages (collect = false) {
      getImages({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    }
  }
}
</script>

<style lang="less" scoped>
.action-head{
  padding-bottom: 20px;
  .btn{
      margin-left: 500px;
  }
}
</style>
