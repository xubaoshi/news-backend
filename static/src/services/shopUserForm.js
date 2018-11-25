import { request } from '../utils'

export async function loadCitys(params) {
  return request({
    url: '/api/citys',
    method: 'GET',
    data: {
      ...params
    }
  })
}

export async function loadShopUser(params) {
  const id = params.id || 0
  const url = `/api/restql/web_shop_user/${id}`

  return request({
    url,
    method: 'get'
  })
}

export async function update(params) {
  const id = params.nid || 0
  if (!id) {
    return
  }

  delete params.nid

  return request({
    url: `/api/restql/web_shop_user/${id}`,
    method: 'put',
    data: params
  })
}

export async function save(params) {
  return request({
    url: '/api/restql/web_shop_user',
    method: 'post',
    data: params
  })
}
