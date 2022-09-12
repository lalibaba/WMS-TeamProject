import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (config.baseurl === process.env.VUE_APP_BASE_IPS) {
    config.baseURL = process.env.VUE_APP_BASE_IPS
  }
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { isSuccess, msg, data } = response.data
  if (isSuccess) { // 业务成功
    return data
  } else {
    Message.error(msg) // 业务报错
    return Promise.reject(new Error(msg))
  }
}, (err) => {
  Message.error(err.message || '')
  return Promise.reject(err)
})

export default service
