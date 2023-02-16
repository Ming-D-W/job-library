import request from '@/utils/request'

export const login = ({ username, password }) => {
  return request.post('/private/v1/login', {
    username,
    password
  })
}
export const getMenu = () => {
  return request.get('/private/v1/menus')
}
// 获取用户列表
export const getUser = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/users',
    params
  })
}

// 更改按钮状态
export const changeUserState = (id, state) => {
  return request({
    method: 'PUT',
    url: `/private/v1/users/${id}/state/${state}`
  })
}
// 添加用户
export const addUser = (data) => {
  return request({
    method: 'POST',
    url: '/private/v1/users',
    data
  })
}

// 获取单个用户
export const getUserDetail = (id) => {
  return request({
    method: 'get',
    url: '/private/v1/users/' + id
  })
}
// 修改用户
export const editUserDetail = (id, data) => {
  return request({
    method: 'put',
    url: `/private/v1/users/${id}`,
    data
  })
}
// 删除用户
export const delUser = (id) => {
  return request({
    method: 'delete',
    url: `/private/v1/users/${id}`
  })
}
// 获取单个角色
export const distributeUser = (id) => {
  return request({
    method: 'get',
    url: '/private/v1/roles',
    query: { id }
  })
}
// 修改角色
export const changeRoles = (id, data) => {
  return request({
    method: 'put',
    url: `/private/v1/users/${id}/role`,
    data
  })
}
