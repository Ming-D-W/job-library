import request from '@/utils/request'
// 获取商品分类数据列表
export function getShop (params) {
  return request({
    method: 'GET',
    url: '/private/v1/categories',
    params
  })
}
// 创建商品分类
export function createCategories (data) {
  return request({
    method: 'POST',
    url: '/private/v1/categories',
    data
  })
}

// 修改商品分类
export function editCategories (id, data) {
  return request({
    method: 'PUT',
    url: '/private/v1/categories/' + id,
    data
  })
}
// 删除商品分类
export function delCategories (id) {
  return request({
    method: 'DELETE',
    url: '/private/v1/categories/' + id
  })
}
