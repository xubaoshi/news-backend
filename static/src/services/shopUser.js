import { request } from "../utils";

export async function query(params) {
	return request({
		url: "/api/restql/web_shop_user",
		method: "GET",
		data: { 
			...params,
			condition:{status:0}
		}
	});
}

export async function remove(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(",");

	return request({
		url: `/api/restql/web_shop_user/${ids}`,
		method: "delete"
	});
}

export function update(params) {
	const id = params.nid;
	delete params.nid;

	return request({
		url: `/api/restql/web_shop_user/${id}`,
		method: "put",
		data: params
	});
}


