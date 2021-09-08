import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  }
)
export default request
