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
