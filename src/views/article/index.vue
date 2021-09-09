<template>
  <div class="article-container">
      <el-card class="filter-card">
          <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item label="状态">
              <el-radio-group v-model="form.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核失败"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="已删除"></el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="form.region" placeholder="请选择频道">
                <el-option label="区域一" value="啊"></el-option>
                <el-option label="区域二" value="是"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
              <el-date-picker v-model="form.data1"
              type="datetimerang" start-placeholder="开始日期"
              end-placeholder="结束日期" :default-time="['12:00:00']">
              </el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">查询</el-button>
          </el-form-item>
      </el-form>
      </el-card>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              根据筛选条件共查询到46145条结果
          </div>
            <el-table
            :data="articles"
            style="width: 100%"
            class="list-table"
            size="mini">
            <el-table-column
                prop="date"
                label="封面">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
                    <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
                    <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
                </template>
            </el-table-column>
             <el-table-column
                prop="pubdate"
                label="发布时间">
            </el-table-column>
             <el-table-column
                label="操作">
                <template>
                    <el-button size="mini" type="primary" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="mini" circle icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
            </el-table>
      </el-card>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
    </el-pagination>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        data1: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [] // 文章列表
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      getArticles().then(res => {
        console.log(res.data.data.results)
        this.articles = res.data.data.results
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card{
    margin-bottom: 30px;
}
.list-table{
    margin-bottom: 20px;
}
</style>
