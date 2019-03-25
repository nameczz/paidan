import axios from 'axios'
import { Toast } from 'cube-ui'
import Storage from 'good-storage'

// import Router from '@/router'
// import Store from '@/store/'
console.log(Toast)
const ERROR_OK = 200

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 50000,
  // withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json' 加上这个就无法登陆。。。
  }
})

http.interceptors.request.use(
  function(config) {
    const token = Storage.get('token')
    token && (config.params = Object.assign({}, config.params, { token }))
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  function(res) {
    const { data } = res
    if (data && data.code !== ERROR_OK) {
      const toast = Toast.$create({
        type: 'txt',
        txt: data.message,
        time: 500
      })
      toast.show()
    }

    return res
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default http
