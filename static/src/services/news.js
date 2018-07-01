import { request } from "../utils";

export async function query(params) {
	return request({
		url: "/api/restql/web_news",
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
		url: `/api/restql/web_news/${ids}`,
		method: "delete"
	});
}

export function update(params) {
	const id = params.nid;
	delete params.nid;

	return request({
		url: `/api/restql/web_news/${id}`,
		method: "put",
		data: params
	});
}


