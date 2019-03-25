import Storage from 'good-storage'
export default {
  state: {
    username: '',
    userId: '',
    token: ''
  },
  mutations: {
    setUser(state, payload) {
      const { username, userToken, userId } = payload
      state.username = username
      state.token = userToken
      state.userId = userId

      Storage.set('username', username)
      Storage.set('userId', userId)
      Storage.set('token', userToken)
    },
    logout(state) {
      state.username = ''
      state.token = ''
      state.userId = ''
      Storage.remove('username')
      Storage.remove('userId')
      Storage.remove('token')
    }
  },
  getters: {
    username: state => {
      return state.username
    },
    userId: state => {
      return state.userId
    },
    token: state => {
      return state.token
    }
  }
}
