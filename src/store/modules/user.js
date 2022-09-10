// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken() || '',
  name: 'admin',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  login({ commit }, userInfo) {
    commit('SET_NAME', userInfo.username)
    commit('SET_TOKEN', 111)
    setToken(111)
  },

  // user logout
  logout({ commit, state }) {
    removeToken() // 移除本地token
    resetRouter()
    // commit('RESET_STATE')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

