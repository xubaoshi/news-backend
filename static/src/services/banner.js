import { request } from '../utils'

export async function loadBanners(params) {
  const id = params.nid || 1
  const url = `/api/restql/web_banner/${id}`

  return request({
    url,
    method: 'get'
  })
}

export async function update(params) {
  const id = params.nid || 1
  // if (!id) {
  //   return
  // }

  delete params.nid

  return request({
    url: `/api/restql/web_banner/${id}`,
    method: 'put',
    data: params
  })
}
