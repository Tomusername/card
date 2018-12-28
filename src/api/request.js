import Axios from 'axios'
const instance =Axios.create()
const env=process.env.NODE_ENV
let baseURL

if(env==='development'){
  baseURL='http://localhost:3000'
}else if(env ==='prodoction'){
  baseURL=''
}

instance.defaults.baseURL=baseURL
instance.interceptors.request.use((req)=>{
  console.log('请求之前拦截')
  return req
})
instance.interceptors.response.use((res)=>{
  console.log('请求之后拦截')
  return res
})
export default instance
