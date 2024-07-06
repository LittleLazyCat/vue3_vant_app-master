import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { showFailToast } from 'vant'
// 1.创建新axios实例，设置基础配置
const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 2.请求拦截器
request.interceptors.request.use(
  // function (config) {
  //   // 在发送请求之前做些什么
  //   return config
  // },

  // 上面改写为箭头函数
  (config) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },

  // function (error) {
  //   // 对请求错误做些什么
  //   return Promise.reject(error)
  // }
  // 上面改写为箭头函数
  (error) => {
    Promise.reject(error)
  }
)

// 3.响应拦截器
request.interceptors.response.use(
  // function (response) {
  //   // 对响应数据做点什么
  //   return response
  // },

  // 上面改写为箭头函数
  (res) => {
    // 后台约定
    if (res.data?.code !== 10000) {
      showFailToast(res.data?.message)
      return Promise.reject(res.data)
    }
    return res.data
  },

  // function (error) {
  //   // 对响应错误做点什么
  //   return Promise.reject(error)
  // }

  // 上面改写为箭头函数
  (err) => {
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

//4.导出
export { baseURL, request }
