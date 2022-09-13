import request from '@/utils/request'
/**
 *
 *  分页查询货品管理
 */
export function getGoodsList(params) {
  return request({
    url: '/goods/pageDetail',
    params
  })
}
/**
 *
 *  增加货品管理
 */
export function addGood(data) {
  return request({
    url: '/goods',
    method: 'POST',
    data
  })
}
/**
 *
 *  删除货品管理
 */
export function delGood(params) {
  return request({
    url: '/goods',
    method: 'delete',
    params
  })
}
/**
 *
 *  修改货品管理
 */
export function editGood(data) {
  return request({
    url: '/goods',
    method: 'PUT',
    data
  })
}
/**
 *
 *  查询货品管理
 */
export function getGoodDetail(id) {
  return request({
    url: `/goods/${id}`,
    method: 'get'
  })
}
/**
 *
 *  模糊查询货品类型
 */
export function goodsTypeVague(params) {
  return request({
    url: '/goodsType/vague',
    params
  })
}
/**
 *
 *  模糊查询货主
 */
export function ownerVague(params) {
  return request({
    url: '/owner/vague',
    params
  })
}
/**
 *
 *  查询全部库区ownerId
 */
export function getAllareaList(params) {
  return request({
    url: '/area/list',
    params
  })
}

