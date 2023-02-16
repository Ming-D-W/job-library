import request from '@/utils/request'

// 获取权限树
export function getRightsTree () {
  return request({
    method: 'GET',
    url: '/private/v1/rights/tree'
  })
}

// 给角色设置权限
export function setRoleRights (roleId, rids) {
  return request({
    method: 'POST',
    url: `/private/v1/roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
// 获取单个角色信息
export function getRoleItem (id) {
  return request({
    method: 'GET',
    url: '/private/v1/roles/' + id
  })
}

// 修改角色信息
export function editRole (id, data) {
  return request({
    method: 'PUT',
    url: '/private/v1/roles/' + id,
    data
  })
}
// 删除角色
export function delRole (id) {
  return request({
    method: 'DELETE',
    url: '/private/v1/roles/' + id
  })
}
// 权限添加角色
export function addRole (data) {
  return request({
    method: 'POST',
    url: '/private/v1/roles',
    data
  })
}
// 获取权限列表
export function getRights () {
  return request({
    method: 'GET',
    url: '/private/v1/rights/list'
  })
}
// 获取角色列表
export function getRoles () {
  return request({
    method: 'GET',
    url: '/private/v1/roles'
  })
}
// 删除角色所带的权限
export function delRoleRight (roleId, perId) {
  return request({
    method: 'DELETE',
    url: `/private/v1/roles/${roleId}/rights/${perId}`
  })
}
