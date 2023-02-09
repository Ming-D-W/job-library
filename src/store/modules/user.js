import { delToken, getToken, setToken } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      token: getToken()
    }
  },
  mutations: {
    setUserToken (state, payload) {
      state.token = payload
      setToken(payload)
    },
    delToken (state) {
      state.token = null
      delToken()
    }
  }
}
