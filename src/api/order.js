import request from '@/utils/request'

// 获取订单列表
export function getOlderList (params) {
  return request({
    method: 'GET',
    url: '/private/v1/orders',
    params
  })
}

// 获取订单详情
export function getOlderDetail (id) {
  return request({
    method: 'GET',
    url: '/private/v1/orders/' + id
  })
}

// 修改订单
export function editOrder (id, data) {
  return request({
    method: 'PUT',
    url: '/private/v1/orders/' + id,
    data
  })
}
// 查看物流信息
export function getExpressInfo (id) {
  return request({
    method: 'GET',
    url: '/private/v1/kuaidi/' + id
  })
}
