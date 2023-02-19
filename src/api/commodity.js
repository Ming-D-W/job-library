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
// 获取商品列表
export function getGoodsList (params) {
  return request({
    method: 'GET',
    url: '/private/v1/goods',
    params
  })
}

// 删除商品
export function delGoods (id) {
  return request({
    method: 'DELETE',
    url: '/private/v1/goods/' + id
  })
}

// 获取商品分类
export function getGoodsCategories () {
  return request({
    method: 'GET',
    url: '/private/v1/categories'
  })
}

// 获取商品参数
export function getGoodsAttributes (id, sel) {
  return request({
    method: 'GET',
    url: `/categories/${id}/attributes`,
    params: {
      sel: sel
    }
  })
}
// 添加商品
export function addGoods (data) {
  return request({
    method: 'POST',
    url: '/private/v1/goods',
    data
  })
}

// 获取动态参数详情
export function getParamsDetail (id, catid) {
  return request({
    method: 'GET',
    url: `/private/v1/categories/${id}/attributes/${catid}?attr_sel=many`
  })
}

// 添加动态参数
export function addParams (id, data) {
  return request({
    method: 'POST',
    url: `/private/v1/categories/${id}/attributes`,
    data
  })
}

// 修改动态参数
export function editParams (id, attrid, data) {
  return request({
    method: 'PUT',
    url: `/private/v1/categories/${id}/attributes/${attrid}`,
    data
  })
}

// 删除动态参数
export function delParams (id, attrid) {
  return request({
    method: 'DELETE',
    url: `/private/v1/categories/${id}/attributes/${attrid}`
  })
}
