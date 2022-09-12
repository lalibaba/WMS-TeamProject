import request from '@/utils/request'
// 分页查询入库单明细
export function getstorageinlist(params) {
  return request({
    url: '/receipt/pageDetail',
    baseurl: process.env.VUE_APP_BASE_IPS,
    params
  })
}

// 分页查询入库单
export function getstoragein(params) {
  return request({
    url: '/receipt/page',
    params
  })
}

// 模糊查询货主
export function getowner(params) {
  return request({
    url: '/owner/vague',
    params
  })
}

// 查询全部仓库
export function getwarehouselist(params) {
  return request({
    url: '/warehouse/list',
    params
  })
}

// 分页查询明细货品
export function getgoodspageDetail(params) {
  return request({
    url: '/goods/pageDetail',
    params
  })
}

// 新增入库单
export function addreceipt(data) {
  return request({
    method: 'POST',
    url: '/receipt',
    baseurl: process.env.VUE_APP_BASE_IPS,
    data
  })
}

// 获取下一个编码
export function codeFactorynext(name) {
  return request({
    url: `/codeFactory/next/${name}`
  })
}

// 查询入库单(点修改详情发起请求)
export function receipt(id) {
  return request({
    url: `/receipt/${id}`
  })
}

// 分页查询入库清单明细
export function receiptListpageDetail(params) {
  return request({
    url: '/receiptList/pageDetail',
    baseurl: process.env.VUE_APP_BASE_IPS,
    params
  })
}
// 批量新增入库清单
export function receiptListbatch(data) {
  return request({
    url: '/receiptList/batch',
    baseurl: process.env.VUE_APP_BASE_IPS,
    data
  })
}

// 查询详细
export function receiptdetail(id) {
  return request({
    url: `/receipt/detail/${id}`,
    baseurl: process.env.VUE_APP_BASE_IPS
  })
}
