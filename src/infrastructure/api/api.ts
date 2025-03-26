import axios from 'axios'
import {AutenticacaoInterceptor} from './autenticacao.interceptor'

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}/${process.env.API_PATH}/`,
})

api.interceptors.request.use(AutenticacaoInterceptor)

export default api
