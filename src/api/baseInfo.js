import request from '@/utils/request'

// 分页查询仓库
export const getWareHouseList = (params) => {
  return request({
    url: '/warehouse/page',
    params
  })
}

// 新增仓库前获取数据
export const getWareHouseCode = () => {
  return request({
    url: '/codeFactory/next/CK'
  })
}

// 新增仓库
export const addNewWarehouse = (data) => {
  return request({
    url: '/warehouse',
    method: 'POST',
    data
  })
}

// 修改仓库
export const changeNewWarehouse = (data) => {
  return request({
    url: '/warehouse',
    method: 'PUT',
    data
  })
}

// 删除仓库
export const delWarehouse = (params) => {
  return request({
    url: '/warehouse',
    method: 'DELETE',
    params
  })
}

// 查询仓库信息
export const getWareHouseDetail = (id) => {
  return request({
    url: `warehouse/${id}`
  })
}

// 分页查询库区
export const getWareAreaList = (params) => {
  return request({
    url: '/area/pageDetail',
    params
  })
}