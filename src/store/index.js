
/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/9/22
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './type'

Vue.use(Vuex);

const state = {
  userInfo:{},
  token:null,
  AdminHomeCurrentPage:1,
  AdminArticleManageCurrentPage:1,
  UserHomeCurrentPage:1,
};

const mutations = {
 [type.LOGIN]: (state, data) => {
   console.log('store->index->login',data);
   if(data.userInfo){
     state.userInfo = data.userInfo;
     window.localStorage.setItem('youngUserInfo', JSON.stringify(data.userInfo));
   }
   if(data.token){
     state.token = data.token;
     window.localStorage.setItem('youngToken', data.token);
   }
 },
  [type.LOGOUT]: (state) => {
   state.userInfo = {};
   state.token = null;
   window.localStorage.removeItem('youngUserInfo');
   window.localStorage.removeItem('youngToken');
   console.log('store->index-> 已注销');
  },
  [type.AdminHomeCurrentPage]: (state, data) => {
    state.AdminHomeCurrentPage = data
  },
  [type.AdminArticleManageCurrentPage]: (state, data) => {
    state.AdminArticleManageCurrentPage = data
  },
  [type.UserHomeCurrentPage]: (state, data) => {
    state.UserHomeCurrentPage = data
  }
};

export default new Vuex.Store({
  state:state,
  mutations:mutations
})
