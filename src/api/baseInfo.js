import request from '@/utils/request'

// 分页查询仓库
export const getWareHouseList = (params) => {
  return request({
    url: '/warehouse/page',
    params
  })
}

// 新增仓库前获取数据
export const getWareHouseCode = (name) => {
  return request({
    url: `/codeFactory/next/${name}`
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

// 查询全部仓库
export const searchWareHouse = (params) => {
  return request({
    url: '/warehouse/list',
    params
  })
}

// 分页查询库区
export const getWareAreaList = (params) => {
  return request({
    url: '/area/pageDetail',
    params
  })
}

// 新增库区
export const addNewWareArea = (data) => {
  return request({
    url: '/area',
    method: 'POST',
    data
  })
}

// 修改库区
export const changeNewWareArea = (data) => {
  return request({
    url: '/area',
    method: 'PUT',
    data
  })
}

// 查询库区信息
export const getWareAreaDetail = (id) => {
  return request({
    url: `/area/${id}`
  })
}

// 删除库区
export const delWareArea = (params) => {
  return request({
    url: '/area',
    method: 'DELETE',
    params
  })
}

// 导入库区
export const importArea = (data) => {
  return request({
    url: '/area/importExcel',
    method: 'POST',
    data
  })
}

// 查询全部库区
export const searchAllWareArea = (params) => {
  return request({
    url: '/area/list',
    params
  })
}

// 库区总览
export const searchAreaOverview = (id) => {
  return request({
    url: `/area/overview/${id}`
  })
}

// 分页查询库位
export const getWareLocationList = (params) => {
  return request({
    url: '/location/pageDetail',
    params
  })
}

// 获取库位详情
export const getWareLocationDetail = (id) => {
  return request({
    url: `/location/${id}`
  })
}

// 新增库位
export const addNewWareLocation = (data) => {
  return request({
    url: '/location',
    method: 'POST',
    data
  })
}

// 修改库位
export const changeNewWareLocation = (data) => {
  return request({
    url: '/location',
    method: 'PUT',
    data
  })
}

// 删除库位
export const delWareLocation = (params) => {
  return request({
    url: '/location',
    method: 'DELETE',
    params
  })
}

// 导入库位
export const importLocation = (data) => {
  return request({
    url: '/location/importExcel',
    method: 'POST',
    data
  })
}

// 获取库位详细信息
export const getLocationDetails = (params) => {
  return request({
    url: '/location/listDetail',
    params
  })
}