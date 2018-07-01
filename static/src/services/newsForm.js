import { request } from "../utils";

export async function loadNew(params) {
	const id = params.id || 0;
	const url = `/api/restql/web_news/${id}`

	return request({
		url,
		method: "get"
	});
}

export async function update(params) {
	const id = params.nid || 0;
	if (!id) {
		return;
	}

	delete params.nid;

	return request({
		url: `/api/restql/web_news/${id}`,
		method: "put",
		data: params
	});
}

export async function save(params) {
	return request({
		url: "/api/restql/web_news",
		method: "post",
		data: params
	});
}
