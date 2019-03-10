<template>
  <div id="user-home-mian" style="display: flex;flex-direction: column; align-items: center;padding: 0 0 60px 0">
    <mu-paper style="margin-top: 20px;width: 80%; z-index: 1" class="article-detail" :z-depth="3"
              v-for="article,index in articles" :key="index">
      <div style="background-color: #4d4d4d;padding-left: 5px;margin-right: 60px">
        <Row style="text-align: left;background-color: white;padding:25px 0 0 15px">
          <!--<Col style="display: flex;flex-direction: row;align-items: center" span="15" :md="{span:20}">-->
          <a href="#" @click="goRouter(article.article_uuid)"
             style="font-family: Microsoft YaHei;font-size: 26px;letter-spacing: 1px;color: #424242;margin-left: 40px">{{article.title}}</a>
          <!--</Col>-->
        </Row>
        <Row style="background-color: white;display: flex;justify-content: flex-end">
          <!--<Col style="height:7vh;display: flex;align-items: flex-end;justify-content: flex-end" span="9" :md="{span:4}">-->
            <div>
              <Tag type="border" color="#4d4d4d">{{article.tags}}</Tag>
              <Tag type="border" color="#4d4d4d">{{article.second_tags}}</Tag>
            </div>
          <!--</Col>-->
        </Row>
      </div>
      <div style="margin-top: 10px;padding:0 65px;margin-bottom: 20px">
        <img style="height: 63vh;width: 100%" :src="article.image_url"/>
        <div style="font-size: 16px;text-align: left;line-height: 30px;margin-top: 10px;letter-spacing:0.5px">{{article.abstract}}</div>
        <Row style="margin-top: 15px ">
          <Col span="15" :md="{span:7}" :lg="{span:6}" style="text-align: left">
          <label style="color: #757575;font-size: 16px;display: flex;align-items: flex-end">
            <Icon type="md-calendar" size="26"/>&nbsp;&nbsp;{{article.pub_time.split(' ')[0]}}</label>
          </Col>
          <Col :md="{span:3,offset:12}" :lg="{span:4,offset:14}" style="display: flex;" span="2">
          <mu-button style="background-color: #4d4d4d;color: white;height: 30px;width: 110px"
                     @click="goRouter(article.article_uuid)">阅读全文 >>
          </mu-button>
          </Col>
        </Row>
        <div>
        </div>
      </div>
    </mu-paper>
    <Page style="margin-top: 60px;z-index: 1" :total="total" :current="currentPage" show-elevator @on-change="otherPage"/>
  </div>
</template>

<script>
  import {CanvasParticle} from '../../../../static/js/home_back.js'
  export default {
    name: 'user-home',
    data () {
      return {
        articles: [],
        total:null,
      }
    },
    mounted () {
      this.getAllArticle(this.$store.state.UserHomeCurrentPage)
    },
    methods: {
      otherPage (page) {
        // console.log('UserHome -> otherPage->',page)
        this.getAllArticle(page)
        document.body.scrollTop = document.documentElement.scrollTop = 0
        // $("html,body").animate({scrollTop:0},500);
      },
      goRouter (articleID) {
        // console.log('UserHome -> goRouter',articleID)
        this.$router.push({
          name: 'user-detail',
          query: {
            articleID: articleID
          }
        })
      },
      getAllArticle (page) {
        let url = this.GlobalVar.apiConfig.user.userGetAllArticle + '?page=' + page;
        this.$http.get(url).then(
          res => {
            // console.log('userHome -> getAllArticle ->', res.data);
            this.$store.commit('UserHomeCurrentPage', page);
            this.articles = res.data.data.articles;
            this.total = res.data.data.total;
            if(this.total === 0){

            }
          },
          err => {
            console.log()
          }
        )
      },
    },
    computed: {
      currentPage () {
        return this.$store.state.UserHomeCurrentPage
      }
    }
  }
</script>

<style scoped>
</style>
