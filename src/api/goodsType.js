import request from '@/utils/request'
/**
 *
 *  分页查询货品类型管理
 */
export function getGoodsTypeList(params) {
  return request({
    url: '/goodsType/page',
    params
  })
}
/**
 *
 *  添加货品类型管理
 */
export function addGoodsType(data) {
  return request({
    url: '/goodsType',
    data,
    method: 'POST'
  })
}
/**
 *
 *  修改货品类型管理
 */
export function editGoodsType(data) {
  return request({
    url: '/goodsType',
    data,
    method: 'put'
  })
}
/**
 *
 *  删除货品类型管理
 */
export function delGoodsType(params) {
  return request({
    url: '/goodsType',
    params,
    method: 'delete'
  })
}
/**
 *
 *  查询货品类型管理
 */
export function getGoodDetail(id) {
  return request({
    url: `/goodsType/${id}`
  })
}
