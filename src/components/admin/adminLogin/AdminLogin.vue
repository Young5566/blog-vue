<template>
  <div class="login-main">
    <Card style="width:300px;height:250px; position: absolute;margin-top: 35vh;margin-left: 25vw;background-color: rgba(255,255,255,0)">
      <p slot="title" style="color: white">
        W e l c o m e
      </p>
      <Form ref="userInfo" :model="userInfo" :rules="ruleInline" inline style="padding-top: 9px">
        <FormItem prop="user_name">
          <Input type="text" v-model="userInfo.user_name" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="userInfo.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <mu-button color="#4d4d4d" @click="login">登 陆</mu-button>
          <!--<Button type="primary" style="width: 100px;margin-top: 15px" @click="login">登陆</Button>-->
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'admin-login',
    data(){
      return{
        userInfo:{
          user_name:'',
          password:''
        },
        ruleInline:{
          user_name:[{required:true,message:'请输入用户名！', trigger:'blur'}],
          password:[{required:true,message:'请输入密码！', trigger:'blur'}]
        }
    }
    },
    methods:{
      login(){
        this.$http.post(this.GlobalVar.apiConfig.admin.adminLogin, this.userInfo).then(
          res => {
            if(res.data.code === 200) {
              // console.log('login.vue ->',res.data);
              this.$store.commit('login',{
                userInfo:{
                  userName:res.data.data.user_name,
                  email:res.data.data.email,
                  head_img: res.data.data.head_img
                },
                token:res.data.data.token,
              });
              this.$router.push({
                name:'admin-home'
              })
            } else {
              this.$Message.error('账号或密码错误！');
            }
          },
          err => {
            console.log('login.vue->',err);
          }
        )
      },
    }
  }
</script>

<style scoped>
.login-main{
  margin-top: 0px;
  height: 100vh;
  width: 100vw;
  background-image: url("../../../assets/images/login_back.jpg");
  background-size: 100%;
}
</style>
