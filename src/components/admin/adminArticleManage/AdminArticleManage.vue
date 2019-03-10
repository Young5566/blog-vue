<template>
  <div style="z-index: 1; width: 95%; height: 100vh;padding-top: 40px">
    <!--<div style="display: flex;flex-direction: column;width: 100%">-->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        :header-cell-style="{
            'background-color':'#9e9e9e',
            'color':'white'
        }"
      >
        <el-table-column
          prop="article_uuid"
          label="文章ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          width="100">
        </el-table-column>
        <el-table-column
          prop="second_tags"
          label="次标签"
          width="100">
        </el-table-column>
        <el-table-column
          prop="pub_time"
          label="发表时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="image_uuid"
          label="图片id">
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              plain
              @click="handleView(scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="info"
              plain
              @click="handleEdit(scope.$index, scope.row)">选图</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :page-size="8" style="margin-top: 40px;z-index: 1" :total="total" :current="currentPage" show-elevator @on-change="otherPage"/>
    <!--</div>-->
    <Modal v-model="modal" fullscreen :footer-hide="true">
    <p slot="header" style="text-align:center;font-size: 16px;color: white">
      <span>选 择 图 片</span>
    </p>
    <choose-image ref="chooseImage" :article="article" @chooseImage="chooseImage"/>
    </Modal>
  </div>
</template>

<script>
  import ChooseImage from './childs/ChooseImage'
  export default {
    name: "admin-article-manage",
    components: {ChooseImage},
    comments:[
      ChooseImage
    ],
    data() {
      return {
        articles: [{}],
        articleIndex:null,
        article:{},
        total:10,
        modal:false
      }
    },
    mounted(){
      this.getAllArticle(this.$store.state.AdminArticleManageCurrentPage);
    },
    methods: {
      handleDelete (index, articleInfo) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除 <span style="color:#ed4014">'+articleInfo.title+'</span>?</p>',
          onOk: () => {
            this.$http.delete(this.GlobalVar.apiConfig.admin.adminDeleteArticle + '/' + articleInfo.article_uuid).then(
              res => {
                if (res.data.code === 200) {
                  // console.log('AdminArticleManage->delelteArticle', res.data);
                  this.articles.splice(index, 1);
                  this.successModal('删除成功！')
                } else {
                  this.errorModal(res.data.msg)
                }
              },
              err => {
                console.log('AdminHome->delete', err)
              }
            )
          }
        })
      },
      handleView(articleInfo){
        this.$router.push({
          name: 'admin-detail',
          query: {
            articleID: articleInfo.article_uuid
          }
        })
      },
      handleEdit(index, articleInfo){
        this.modal = true;
        this.article = articleInfo;
        this.articleIndex = index;
        this.$refs.chooseImage.currentPage=1;
        this.$refs.chooseImage.getAllImages(1, this.$refs.chooseImage.pageSize)
      },
      getAllArticle (page) {
        let url = this.GlobalVar.apiConfig.admin.adminGetAllArticle + '?page=' + page+'&per_page='+ 8;
        this.$http.get(url).then(
          res => {
            // console.log('adminArticleManage -> getAllArticle ->', res.data);
            this.$store.commit('AdminArticleManageCurrentPage', page);
            this.articles = res.data.data.articles;
            this.total = res.data.data.total
          },
          err => {
            console.log()
          }
        )
      },
      changePage(page){
        this.getAllArticle(page);
      },
      chooseImage(image){
          // console.log(image,this.articleIndex);
          this.modal = false;
          this.articles[0].image_uuid = image.image_uuid
      },
      otherPage(page){
        this.getAllArticle(page);
      }
    },
    computed:{
      currentPage () {
        return this.$store.state.AdminArticleManageCurrentPage
      }
    }
  }
</script>

<style lang="less">
  .ivu-table-header{
    font-size: 14px;
    font-weight: 300;
    color: white;
  }
  .ivu-table-header table thead tr th{
    background-color: #4d4d4d;
  }
  .ivu-table-tbody{
    font-size: 13px;
    color: #515a6e;
    background-color: dodgerblue;
  }

  .ivu-modal-content{
    width: 80%;
  }
  .cell{
    text-align: center;
  }
  .table-title{
    background-color: rebeccapurple;
  }
</style>
