const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  receiptdetails: state => state.storageIn.receiptdetails,
  receivingDetail: state => state.storageIn.receivingDetail,
  groundingDetail: state => state.storageIn.groundingDetail
}
export default getters
