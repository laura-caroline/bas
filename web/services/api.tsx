import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080'

})

api.interceptors.request.use((config) => {
  try{
      const token = localStorage.getItem('@token' || `{}`)
      if(token){
          config.headers.Authorization = `Bearer ${token}`
      }
      return config
  }       
  catch(err){
    return config
  }
})

api.interceptors.response.use((response: AxiosResponse)=>{
  return response;
},async (error) => {
  if(error.response?.status === 401){
    const {msg} = error.response.data
    if(msg === 'Token invalid'){
      localStorage.setItem('@token', '')
      localStorage.setItem('@user', JSON.stringify({}))
    }
    return Promise.reject(error)
  }
})

export default api