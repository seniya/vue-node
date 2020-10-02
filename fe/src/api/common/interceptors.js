// import store from '@/store/index'

export function setInterceptors (instance) {
  instance.interceptors.request.use(
    function (config) {
      // config.headers.Authorization = store.state.token
      // axios.defaults.headers.common.Authorization = localStorage.getItem('token')
      config.headers.Authorization = localStorage.getItem('token')
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      console.log(`${response.config.url}`, response)
      return response
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  return instance
}
