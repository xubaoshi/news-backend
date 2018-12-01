import { loadShopUser, update, save, loadCitys } from '../services/shopUserForm'

const initState = {
  id: '',
  name: '',
  area: '',
  shopname: '',
  cityid: undefined,
  provinceid: undefined,
  images: '',
  status: 1,
  citys: []
}

export default {
  namespace: 'shopUserForm',

  state: {
    ...initState
  },

  effects: {
    *loadCitys({ payload }, { call, put }) {
      const data = yield call(loadCitys, payload)
      if (data && data.success) {
        yield put({ type: 'loadCitySuccess', payload: data })
      }
    },

    *loadTable({ payload }, { call, put }) {
      const data = yield call(loadShopUser, payload)
      if (data && data.success) {
        yield put({ type: 'loadTableSuccess', payload: data })
      }
    },

    *saveTable({ payload }, { call, put }) {
      let data = null,
        tableData = null
      const callback = payload.callback
      delete payload.callback
      console.log('payload', payload)
      const params = {
        name: payload.name || '',
        shopname: payload.shopname || '',
        status: payload.status || 0,
        provinceid: payload.provinceid,
        cityid: payload.cityid,
        provincename: payload.provincename,
        cityname: payload.cityname,
        images: payload.images,
        time: payload.time,
        area: payload.area
      }

      if (payload.nid) {
        params.nid = payload.nid
        data = yield call(update, params)
      } else {
        data = yield call(save, params)
      }

      yield put({ type: 'loadTableSuccess', payload: data })
      callback && callback(data)
    }
  },

  reducers: {
    resetState(state) {
      return { ...state, ...initState }
    },

    loadCitySuccess(state, action) {
      const data = action.payload && action.payload.data
      if (data) {
        return {
          ...state,
          citys: data
        }
      }
      return state
    },

    loadTableSuccess(state, action) {
      const data = action.payload && action.payload.data
      if (data) {
        return {
          ...state,
          ...data
        }
      }
      return state
    }
  }
}
