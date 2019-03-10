/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/9/19
 */
import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(
  function(config){
    // console.log('请求拦截', config)
    if(localStorage.getItem('youngToken')){
      config.headers.common['token'] = window.localStorage.getItem('youngToken')
    }
    return config
  },
  function (error) {
    console.log()
  }
)

axios.interceptors.response.use(
  response => {
    // console.log('响应拦截', response);
    if(response.data.code===703){
      window.localStorage.removeItem('youngToken')
      window.localStorage.removeItem('')
      router.push('/login')
    }
    return response;
},
  function (err) {
    console.log('响应错误拦截',err)
    return Promise.reject(err)
  }
)

export default axios;
