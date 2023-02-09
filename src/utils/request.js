/* 封装axios用于发送请求 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'https://lianghj.top:8888/api',
  // baseURL: 'http://weldon.net.cn:8889/api',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { token } = store.state.user
    console.log(token)
    if (token) {
      config.headers.Authorization = ` ${token}`
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  }, (err) => {
    if (err.response.status === 401) {
      store.commit('user/delToken')
      // 登录跳转
      router.push('/login')
      Message.error('登录过期，请重新登录')
    } else {
      Message.error(err?.response?.data?.message || '系统出错')
    }
    return Promise.reject(err)
  })
export default request
