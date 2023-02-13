import request from '@/utils/request'

// export const getRightsList = () => {
//   return request({
//     method: 'GET',
//     url: '/private/v1/rights/list'
//   })
// }
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
