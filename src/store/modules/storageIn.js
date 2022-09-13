const state = {
  receiptdetails: {},
  receivingDetail: {} // 收货任务详细
}

const mutations = {
  SET_RECEIPTDETAILS: (state, receiptdetails) => {
    state.receiptdetails = receiptdetails
  },
  SET_RECEIVINGDETAIL: (state, value) => {
    state.receivingDetail = value
  }
}
const actions = {
  viewdetails({ commit }, receiptdetails) {
    commit('SET_RECEIPTDETAILS', receiptdetails)
  },
  receivingdetails({ commit }, value) {
    commit('SET_RECEIVINGDETAIL', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
