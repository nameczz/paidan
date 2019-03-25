import BaseModel from './base-model'
import http from './index'
export default class User extends BaseModel {
  static LOGIN_URL = '/u/login'
  static LOGOUT_URL = '/u/logout'
  static TOKEN_URL = '/u/token'

  static async login(params) {
    try {
      const res = await http.post(this.LOGIN_URL, params)
      const { data } = res.data
      return new this(data)
    } catch (e) {
      throw e
    }
  }

  static async logout(params) {
    try {
      const res = await http.post(this.LOGOUT_URL, params)
      return res.data
    } catch (e) {
      throw e
    }
  }

  static async getToken(params) {
    try {
      const res = await http.get(this.TOKEN_URL, { params })
      return res.data.data
    } catch (e) {
      throw e
    }
  }

  get userId() {
    return this.id || ''
  }
}
