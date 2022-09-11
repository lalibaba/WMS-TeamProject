export const warehouseStatus = [
  {
    status: 0,
    name: '停用'
  },
  {
    status: 1,
    name: '启用'
  },
  {
    status: '',
    name: '全部'
  }
]

export const warehouseType = [
  // 类型 中转仓:ZZ、加工仓:JG、储备仓:CB、冷藏仓:LC
  {
    type: 'ZZ',
    name: '中转仓'
  },
  {
    type: 'JG',
    name: '加工仓'
  },
  {
    type: 'CB',
    name: '储备仓'
  },
  {
    type: 'LC',
    name: '冷藏仓'
  }
]

export const wareAreaBearType = [
  // 承重类型 重型:ZX、中型:OX、轻型:QX
  {
    bearingType: 'ZX',
    name: '重型'
  },
  {
    bearingType: 'BX',
    name: '中型'
  },
  {
    bearingType: 'QX',
    name: '轻型'
  }
]

export const wareTemplateType = [
  // 温度类型 常温:CW、冷藏:LC、恒温:HW
  {
    temperatureType: 'CW',
    name: '常温'
  },
  {
    temperatureType: 'LC',
    name: '冷藏'
  },
  {
    temperatureType: 'HW',
    name: '恒温'
  }
]

export const wareUserType = [
  // 用途类型 入库缓存区：RKHCQ 出库缓存区：CKHCQ 存储区：CCQ 分拣区：FJQ 质检区：ZJQ
  {
    useType: 'RKHCQ',
    name: '入库缓存区'
  },
  {
    useType: 'CKHCQ',
    name: '出库缓存区'
  },
  {
    useType: 'CCQ',
    name: '存储区'
  },
  {
    useType: 'FJQ',
    name: '分拣区'
  },
  {
    useType: 'ZJQ',
    name: '质检区'
  }
]
