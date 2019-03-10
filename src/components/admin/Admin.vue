<template>
  <div class="admin-main">
    <div id="my-page">
      <div id="left-page" style="position: fixed;width: 300px;height: 100vh;background-color: white;z-index: 1">
        <div style="height: 200px;background-color: #4d4d4d"></div>
        <div style="background-color: white;width: 100%;height: 200px;margin-top: 80px;display: flex;flex-direction: column">
          <a href="#" style="font-size: 32px;color: #424242">Young</a>
          <span style="margin-top: 20px;color: #9e9e9e">You can be anyone you want to be.</span>
          <router-link to="/admin/home?page=1" style="font-size: 16px;color: #424242;margin-top: 40px">主 页</router-link>
          <a href="#" @click="openFirstDrawer" style="font-size: 16px;color: #424242;margin-top: 15px">目 录</a>
          <router-link to="/admin/image" style="font-size: 16px;color: #424242;margin-top: 15px">图片管理</router-link>
          <router-link to="/admin/article/post" style="font-size: 16px;color: #424242;margin-top: 15px">编辑博客</router-link>
          <router-link to="/admin/article/manage" style="font-size: 16px;color: #424242;margin-top: 15px">博客管理</router-link>
          <a href="" @click="logout" style="font-size: 16px;color: #424242;margin-top: 15px">退 出</a>
          <!--<router-link to="" style="font-size: 16px;color: #667aa6;margin-top: 15px">About Me</router-link>-->
          <!--<div style="margin-top: 60px;">-->
            <!--<mu-button icon>-->
              <!--<Icon size="32" type="logo-github" />-->
            <!--</mu-button>-->
            <!--<mu-button icon style="margin-left: 15px;">-->
              <!--<Icon type="ios-mail " style="margin-top: 6px" size="33"/>-->
            <!--</mu-button>-->
          <!--</div>-->
        </div>
        <div style="">
        </div>
    </div>
      <div style="position: fixed;width: 140px;height: 140px;border-radius: 50%;background-color: white;left: 80px;top: 130px;display: flex;justify-content: center;align-items: center;z-index: 1">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542185269&di=b0ec1e5b09f3a0a2c7f6f98ba232dfc1&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F01%2F20150601135046_kwhEu.thumb.700_0.jpeg" style="width: 125px;border-radius: 50%"/>
      </div>
    </div>
    <div id="right-page" style="display: flex;justify-content: center;width: calc(100% - 300px);margin-left: 300px">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <Drawer color="white" title="目 录" style="background-color: red" width="512" :closable="false" v-model="firstDrawer">
      <Menu :theme="theme3" active-name="1" style="height: 100%" @on-select="openSecondDrawer">
        <MenuGroup title="文章分类">
          <MenuItem :name="item" v-for="item,index in typeList" :key="index">
            <Icon type="md-document" />
            {{item}}
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Drawer>
    <Drawer color="white" title="分类目录" :closable="false" v-model="secondDrawer">
      <Menu :theme="theme3" active-name="1" style="height: 100%" @on-select="goDetail">
        <Submenu v-for="(value, key, index) in articleTitles" :key="index" :name="index">
          <template slot="title">
            <Icon type="ios-paper"/>
            {{key}}
          </template>
          <MenuItem :name="item.id" v-for="item,index in value" :key="index">
          {{item.title}}
          </MenuItem>
        </Submenu>
      </Menu>
    </Drawer>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import {CanvasParticle} from './home_back.js'
  export default {
    name: 'admin',
    data(){
      return{
        theme:'dark',
        firstDrawer:false,
        secondDrawer:false,
        theme3:"light",
        typeList:[],
        articleTitles:{}
      }
    },
    mounted(){
      let config = {
        vx: 4,	//小球x轴速度,正为右，负为左
        vy: 4,	//小球y轴速度
        height: 2,	//小球高宽，其实为正方形，所以不宜太大
        width: 2,
        count: 300,		//点个数
        color: "121, 162, 185", 	//点颜色
        stroke: "181, 181, 181", 		//线条颜色
        // stroke: "black", 		//线条颜色
        dist: 6000, 	//点吸附距离
        e_dist: 20000, 	//鼠标吸附加速距离
        max_conn: 10 	//点到点最大连接数
      };
      CanvasParticle(config)
    },
    methods:{
    openFirstDrawer(){
      this.$http.get(this.GlobalVar.apiConfig.admin.adminGetAllTag).then(
          res => {
            // console.log(res.data)
            this.typeList = res.data.data.tags;
            this.firstDrawer = true
          },
          err => {
            console.log('Admin -> openFirstDrawer', err)
          }
        )
    },
    logout(){
      this.$store.commit('logout');
        this.$router.push({
          name:'admin-login'
        });
      },
      openSecondDrawer(name){
        this.$http.get(this.GlobalVar.apiConfig.admin.adminGetArticleByTag + '?tag=' + name).then(
          res => {
            // console.log('Admin -> openSecondDrawer', res.data);
            this.articleTitles = res.data.data
          },
           err => {
            console.log('Admin -> openSecondDrawer', err)
           }
        );
        // console.log(name);
        this.secondDrawer = true
      },
      goDetail(name){
        // console.log(name);
        this.$router.push({
          name:'admin-tool',
          query:{
            articleID:name
          }
        });
        this.firstDrawer = false;
        this.secondDrawer = false;
      }
    }
  }
</script>

<style scoped>
  .admin-main{
    /*background-color:#f5f5f5;*/
    /*height: 100vh;*/
    /*height: 100%;*/
    width: 100vw;
  }

  .ivu-drawer-header{
    background-color: red;
  }
  .ivu-menu-item{
    color: #4d4d4d;
  }
</style>
