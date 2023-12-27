import axio from "axios"
import router from "@/router"

import AuthService from './auth'
import UsersService from './users'
import { setGlobalLoading } from "@/store/global";

const API_ENV = {
  production: '',
  local: 'http://localhost:3000'
}

const httpClient = axio.create({
  baseURL: API_ENV.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config

})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
  }, (error) => {

  const canThrowAnError = error.request.status === 0 || error.request.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push('/')
  }

  setGlobalLoading(false)
  return error
})


export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
}
