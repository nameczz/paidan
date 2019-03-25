export const Loading = {
  methods: {
    async _fetchData(method = 'fetchData', params = {}) {
      const toast = this.$createToast({
        txt: '获取数据中...',
        mask: true,
        time: 0
      })
      toast.show()
      if (this[method]) await this[method](params)
      toast.hide()
    }
  }
}
