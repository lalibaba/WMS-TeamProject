const state = {
  receiptdetails: {}
}

const mutations = {
  SET_RECEIPTDETAILS: (state, receiptdetails) => {
    state.receiptdetails = receiptdetails
  }
}
const actions = {
  viewdetails({ commit }, receiptdetails) {
    commit('SET_RECEIPTDETAILS', receiptdetails)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
