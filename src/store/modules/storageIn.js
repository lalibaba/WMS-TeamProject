const state = {
  receiptdetails: {}, // 入库详细
  receivingDetail: {}, // 收货任务详细
  groundingDetail: {} // 上架任务详细
}

const mutations = {
  SET_RECEIPTDETAILS: (state, value) => {
    state.receiptdetails = value
  },
  SET_RECEIVINGDETAIL: (state, value) => {
    state.receivingDetail = value
  },
  SET_GROUNDINGDETAIL: (state, value) => {
    state.groundingDetail = value
  }
}
const actions = {
  viewdetails({ commit }, receiptdetails) {
    commit('SET_RECEIPTDETAILS', receiptdetails)
  },
  receivingdetails({ commit }, value) {
    commit('SET_RECEIVINGDETAIL', value)
  },
  groundingDetail({ commit }, value) {
    commit('SET_GROUNDINGDETAIL', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
