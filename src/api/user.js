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
