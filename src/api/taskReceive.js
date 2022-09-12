import request from '@/utils/request'

export function receivingPageDetail(params) {
  return request({
    url: '/receiving/pageDetail',
    baseurl: process.env.VUE_APP_BASE_IPS,
    params
  })
}
