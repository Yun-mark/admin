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
              <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核失败</el-radio>
              <el-radio :label="3">审核通过</el-radio>
              <el-radio :label="4">已删除</el-radio>
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
              <el-button type="primary" @click="loadArticles(1)">查询</el-button>
          </el-form-item>
      </el-form>
      </el-card>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              根据筛选条件共查询到{{ totalCount}}条结果
          </div>
            <el-table
            :data="articles"
            style="width: 100%"
            class="list-table"
            size="mini">
            <el-table-column
                prop="date"
                label="封面">
                <template slot-scope="scope">
                  <img class="article-cover" :src="scope.row.cover.image">
                </template>
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
        :page-size="pageSize"
        layout="prev, pager, next"
        @current-change="onCurrentChange"
        :total="totalCount">
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
      status: null, // 查询文章的状态
      totalCount: 0, // 总数据条数
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
      articles: [], // 文章列表
      articleStatus: [
        { status: 0, text: '草稿' },
        { status: 1, text: '待审核' },
        { status: 2, text: '审核通过' }
      ],
      pageSize: 10 // 每页大小
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
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
.article-cover {
  width: 60px;
  background-size: cover;
}
</style>
