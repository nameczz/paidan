import http from './index'

export default class BaseModel {
  constructor(props) {
    // 用来new this绑定数据 defaults 可能有一些默认配置
    Object.assign(this, this.defaults, props)
  }

  static async findAll(params = {}, path = '', method = 'get') {
    const httpConfig = {
      url: path,
      method,
      params
    }
    try {
      const res = await http(httpConfig)
      const data = res.data.data || []
      let list = Array.isArray(data) ? data : data.items
      if (!Array.isArray(list)) return list
      list = list.map(type => {
        return new this(type)
      })

      return data.pagination
        ? Object.assign(list, {
            // 总数据量，用于分页
            total: data.pagination.count
          })
        : list
    } catch (e) {
      console.error(e.message)
    }
  }

  /**
   * 通过 params 寻找某个实例
   */
  static async find(params = {}, url) {
    try {
      const res = await http.get(url, {
        params
      })
      return new this(
        res.data.data instanceof Object ? res.data.data : res.data
      )
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 在数据库中创建当前实例
   */
  async create(
    options = {
      alertOnError: true,
      alertOnSuccess: true,
      url: ''
    }
  ) {
    const url = options.url || this.createUrl
    try {
      const res = await http.post(url, this)
      Object.assign(this, res.data)

      return res.data
    } catch (e) {
      this.constructor.handlerError(e, options)
    }
  }

  async update(
    options = {
      alertOnError: true,
      alertOnSuccess: true,
      url: ''
    }
  ) {
    const url = options.url || this.updateUrl
    try {
      const res = await http.put(url, this)
      Object.assign(this, res.data)

      return res.data
    } catch (e) {
      this.constructor.handlerError(e, options)
    }
  }
}
