import {
	loadNew,
	update,
	save,
} from "../services/newsForm";

const initState = {
	id: "",
	images: "",
	title: "",
	con: "",
	status: 1,
	time: ""
};

export default {
	namespace: "newsForm",

	state: {
		...initState
	},

	effects: {
		*loadTable({ payload }, { call, put }) {
			const data = yield call(loadNew, payload);
			if (data && data.success) {
				yield put({ type: "loadTableSuccess", payload: data });
			}
		},

		*saveTable({ payload }, { call, put }) {
			let data = null,
				tableData = null;
			const callback = payload.callback;
			delete payload.callback;
			console.log("payload", payload);
			const params = {
				title: payload.title || "",
				con: payload.con || "",
				status: payload.status || 0,
				time: payload.time,
				images :payload.images,
			};

			if (payload.nid) {
				params.nid = payload.nid;
				data = yield call(update, params);
			} else {
				data = yield call(save, params);
			}

			yield put({ type: "loadTableSuccess", payload: data });
			callback && callback(data);
		},
	},

	reducers: {
		resetState(state) {
			return { ...state, ...initState };
		},

		loadTableSuccess(state, action) {
			const data = action.payload && action.payload.data;
			if (data) {
				return {
					...state,
					...data,
				};
			}
			return state;
		}
	}
};
