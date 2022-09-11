import request from '@/utils/request'

// 分页查询仓库
export const getWareHouseList = (params) => {
  return request({
    url: '/warehouse/page',
    params
  })
}
