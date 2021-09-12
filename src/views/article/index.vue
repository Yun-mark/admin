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
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channelId" placeholder="请选择频道">
                <el-option label="全部" :value="null"></el-option>
                <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
              <el-date-picker v-model="rangeDate"
              type="datetimerange" start-placeholder="开始日期"
              end-placeholder="结束日期" :default-time="['12:00:00']"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd">
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
                  <el-image class="article-cover" :src="scope.row.cover.images[0]" style="wdith:100px; height: 100px" fit="cover" lazy>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
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
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="onDeleteArticle(scope.row.id)"></el-button>
                </template>
            </el-table-column>
            </el-table>
      </el-card>
    <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :current-page.sync="page"
        @current-change="onCurrentChange"
        :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article.js'
export default {
  name: 'articleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        data2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      page: 1,
      rangeDate: null, // 筛选的范围日期
      channels: [], // 频道列表
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
      pageSize: 10, // 每页大小
      channelId: null // 查询文章的频道
    }
  },
  created () {
    this.loadChannels()
    this.loadArticles(1)
  },
  methods: {
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截至日期
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card{
    margin-bottom: 30px;
    opacity: 0.8;
}
.list-table{
    margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
  font-size: 50px;
  text-align: center;
  height: 100px;
  line-height: 100px;
}
.box-card{
  opacity: 0.8;
}
</style>
