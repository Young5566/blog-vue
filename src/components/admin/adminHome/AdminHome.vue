<template>
  <div style="display: flex;flex-direction: column; align-items: center;padding: 10px 0 60px 0  ">
    <mu-paper style="margin-top: 20px;width: 80%;z-index: 1" class="article-detail" :z-depth="3"
              v-for="article,index in articles" :key="index">
      <div style="background-color: #4d4d4d;padding-left: 5px;margin-right: 60px">
        <Row style="text-align: left;background-color: white;padding:30px 0 0 0">
          <!--<Col style="display: flex;flex-direction: row;align-items: center" span="15" :md="{span:20}">-->
          <a href="#" @click="goRouter(article.article_uuid)"
             style="font-family: Microsoft YaHei;font-size: 34px;letter-spacing: 1px;color: #424242;margin-left: 40px">{{article.title}}</a>
          <!--</Col>-->
        </Row>
        <Row style="background-color: white;display: flex;justify-content: flex-end">
          <!--<Col style="height:7vh;display: flex;align-items: flex-end;justify-content: flex-end" span="9" :md="{span:4}">-->
            <Tag type="border" color="#4d4d4d">{{article.tags}}</Tag>
            <Tag type="border" color="#4d4d4d">{{article.second_tags}}</Tag>
          <!--</Col>-->
        </Row>
      </div>
      <div style="margin-top: 10px;padding:0 45px;margin-bottom: 20px">
        <img style="height: 60vh;width: 100%" :src="article.article_img"/>
        <div style="font-size: 18px;text-align: left;line-height: 30px;margin-top: 10px">{{article.abstract}}</div>
        <Row style="margin-top: 15px ">
          <Col span="11" :md="{span:7}" :lg="{span:6}" style="text-align: left">
          <label style="color: #757575;font-size: 16px;display: flex;align-items: flex-end">
            <Icon type="md-calendar" size="26"/>&nbsp;&nbsp;{{article.pub_time}}</label>
          </Col>
          <Col :md="{span:3,offset:7}" :lg="{span:4,offset:11}" style="display: flex;" span="3">
          <mu-button style="background-color: #4d4d4d;color: white;height: 30px;margin-right: 5px"
                     @click="deleteArticle(article.article_uuid, index)">删除文章
          </mu-button>
          <mu-button style="background-color: #4d4d4d;color: white;height: 30px;width: 110px"
                     @click="goRouter(article.article_uuid)">阅读全文 >>
          </mu-button>
          </Col>
        </Row>
        <div>
        </div>
      </div>
    </mu-paper>
    <Page style="margin-top: 60px" :total="total" :current="currentPage" show-elevator @on-change="otherPage"/>
  </div>
</template>

<script>
  export default {
    name: 'admin-home',
    data () {
      return {
        articles: [],
        total:null
      }
    },
    mounted () {
      this.getAllArticle(this.$store.state.currentPage)
    },
    methods: {
      otherPage (page) {
        console.log(page)
        this.getAllArticle(page)
        document.body.scrollTop = document.documentElement.scrollTop = 0
        // $("html,body").animate({scrollTop:0},500);
      },
      goRouter (articleID) {
        this.$router.push({
          name: 'admin-detail',
          query: {
            articleID: articleID
          }
        })
      },
      getAllArticle (page) {
        let url = this.GlobalVar.apiConfig.admin.adminGetAllArticle + '?page=' + page
        this.$http.get(url).then(
          res => {
            console.log('adminHome -> getAllArticle ->', res.data)
            this.$store.commit('currentPage', page)
            this.articles = res.data.data.articles
            this.total = res.data.data.total
          },
          err => {
            console.log()
          }
        )
      },
      deleteArticle (articleID, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除？</p>',
          onOk: () => {
            console.log(this.currentPage)
            this.$http.delete(this.GlobalVar.apiConfig.admin.adminDeleteArticle + '/' + articleID).then(
              res => {
                if (res.data.code === 200) {
                  console.log('AdminHome->delelteArticle', res.data)
                  this.getAllArticle(this.currentPage)
                  // console.log(this.articles)
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
      }
    },
    computed: {
      currentPage () {
        return this.$store.state.currentPage
      }
    }
  }
</script>

<style scoped>
</style>
