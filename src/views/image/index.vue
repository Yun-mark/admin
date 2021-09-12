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
              <el-button class="btn" type="success" @click="dialogUploadVisible = true">上传素材</el-button>
          </el-radio-group>
      </div>
      <el-row>
          <el-col :span="4" :gutter="20" :lg="4" :md="6" :xs="12" :sm="6"
          v-for="(img, index) in images" :key="index">
              <el-image style="height:100px" :src="img.url" fit="cover"></el-image>
          </el-col>
      </el-row>
      </el-card>
      <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
        <el-upload
          class="upload-demo"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          :show-file-list="false"
          :on-success="onUploadSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [], // 图片列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
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
    },
    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(false)
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

.image-container{
  opacity: 0.8;
}
</style>
