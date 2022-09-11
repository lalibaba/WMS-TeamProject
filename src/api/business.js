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

