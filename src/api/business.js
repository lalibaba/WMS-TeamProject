import request from '@/utils/request'
/**
 *
 *  分页查询货主管理
 */
export function getownerList(params) {
  return request({
    url: '/owner/page',
    params
  })
}
/**
 *
 *  新增货主管理
 */
export function addowner(data) {
  return request({
    url: '/owner',
    method: 'POST',
    data
  })
}
/**
 *
 *  获取下一个编码
 */
export function nextCode(name) {
  return request({
    url: `/codeFactory/next/${name}`
  })
}
/**
 *
 *  分页查询货主-库位关联表 详细
 */
export function getPageDetail(params) {
  return request({
    url: '/ownerLocation/pageDetail',
    params
  })
}
/**
 *
 *  查询全部仓库status=1
 */
export function getAllWarehouse(params) {
  return request({
    url: '/warehouse/list',
    params
  })
}
/**
 *
 * 查询库区库位树 id=xxx
 */
export function getAreatree(params) {
  return request({
    url: '/area/tree',
    params
  })
}
/**
 *
 * 货主批量关联库位
 */
export function postBatch(data) {
  return request({
    url: '/ownerLocation/batch',
    method: 'post',
    data
  })
}
/**
 *
 * 货主批量关联库位
 */
export function delOwnerLocation(params) {
  return request({
    url: '/ownerLocation',
    method: 'delete',
    params
  })
}
/**
 *
 * 查询货主管理明细
 */
export function getOwnerDetail(id) {
  return request({
    url: `/owner/detail/${id}`
  })
}

