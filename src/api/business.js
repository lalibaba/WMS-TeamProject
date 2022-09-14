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
 *  修改货主管理
 */
export function editOwner(data) {
  return request({
    url: '/owner',
    method: 'put',
    data
  })
}
/**
 *
 *  删除货主管理
 */
export function delOwner(params) {
  return request({
    url: '/owner',
    method: 'delete',
    params
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

/**
 *
 * 分页查询承运商
 */
export function getCarrierList(params) {
  return request({
    url: 'carrier/page',
    params
  })
}
/**
 *
 * 修改承运商
 */
export function editCarrier(data) {
  return request({
    url: 'carrier',
    method: 'PUT',
    data
  })
}
/**
 *
 * 删除承运商
 */
export function delCarrier(id) {
  return request({
    url: `/carrier/${id}`,
    method: 'delete'
  })
}
/**
 *
 * 新增承运商
 */
export function addCarrier(data) {
  return request({
    url: '/carrier',
    method: 'post',
    data
  })
}

// {"id": "1",
// "createTime": "2022-09-12 12:17:29",
// "createUser": "0",
// "updateTime": "2022-09-13 12:00:01",
// "updateUser": "0",
// "code": "CYS000001",
// "name": "品物流",
// "personName": "三",
// "phone": "18510981003",
// "email": "18510981002@162.com",
// "location": "北京市西城区",
// "province": "1",
// "city": "3",
// "area": "2",
// "address": "金融街13号",
// "status": "0",
// "remark": "新增",
// "createName": "刘娟",
// "updateName": "刘娟",
// "logicDel": "1"}
