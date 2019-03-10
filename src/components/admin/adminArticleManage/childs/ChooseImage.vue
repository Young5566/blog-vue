<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div style="width: 90%;display: flex;flex-direction: column; justify-content: center; align-items: center">
      <div style="display: flex; flex-wrap: wrap;">
        <Card class="demo-upload-list" v-for="(image,index) in imageList" :key="index" style="width: 305px;height: 230px;margin:15px 5px 0 10px;">
          <img style="height: 150px" :src="image.image_url">
          <div style="margin-top: 10px; display: flex;justify-content: space-between;padding-right: 4px">
            <Tag color="#ff9900" type="border" style="width: 50px;height: 25px;font-size: 14px;text-align: center" >
              {{image.used_count}}
            </Tag>
            <div>
              <!--<Button style="margin-right: 5px;color: #515a6e;border-width: 1px;border-style: solid;border-color: #515a6e" @click.native="handleView(image)">查看</Button>-->
              <!--<Button type="success" ghost @click.native="choose(image)">选择</Button>-->
              <el-button
                size="mini"
                type="info"
                @click="handleView(image)">查看</el-button>
              <el-button
                size="mini"
                type="info"
                @click="choose(image)">选择</el-button>
            </div>
          </div>
        </Card>
        <Modal class-name="picture-model" width="84vw" v-model="visible" :footer-hide="true" :styles="{height:'100vh', top:'0px'}">
          <p slot="header" style="text-align:center;font-size: 16px;color: white">
            <span>{{modelImage.image_name}}</span>
          </p>
          <img v-if="visible" style="width: 65vw" :src="modelImage.image_url">
        </Modal>
      </div>
      <Page :total="total" :page-size="pageSize" show-elevator style="margin:50px 0 70px 0"
            @on-change="changePage" :current="currentPage"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "choose-image",
    props:['article'],
    data () {
      return {
        visible: false,
        imageList:[{}],
        modelImage:{},
        total:0,
        pageSize:10,
        currentPage:1
      }
    },
    methods: {
      handleView (image) {
        this.modelImage = image;
        this.visible = true;
      },
      choose (image) {
        let articleInfo = {
          articleUuid:this.article.article_uuid,
          articleInfo:{
            article_img_uuid:image.image_uuid
          }
        };
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定改为 <span style="color:#ed4014">'+image.image_name+'</span>?</p>',
          onOk: () => {
            // console.log(articleInfo);
            this.$http.post(this.GlobalVar.apiConfig.admin.adminUpdateArticle, articleInfo)
              .then(
                res => {
                  if(res.data.code===200){
                    this.successModal('图片修改成功!');
                    this.$emit('chooseImage', image)
                  }else {
                    this.errorModal('图片修改失败!')
                  }
                }
              )
          }
        });
      },
      getAllImages (page, pageSize){
        this.$http.get(this.GlobalVar.apiConfig.admin.adminGetAllImage+'?page='+page+'&per_page='+pageSize)
          .then(
            res => {
              this.imageList = res.data.data.images;
              this.total = res.data.data.total;
              // console.log(this.imageList, this.total);
            }
          )
      },
      changePage(page){
        this.currentPage = page;
        this.getAllImages(page, this.pageSize)
      }
    }
  }
</script>

<style lang="less">
  .ivu-modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ivu-modal-body{
    width: 100%;
  }
  .picture-model{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ivu-modal-header{
    background-color: #4d4d4d;
    color: white;
  }
</style>
