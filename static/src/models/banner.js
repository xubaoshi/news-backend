import { loadBanners, update } from '../services/banner'

const initState = {
  images: ''
}

export default {
  namespace: 'banner',

  state: {
    ...initState
  },

  effects: {
    *loadTable({ payload }, { call, put }) {
      const data = yield call(loadBanners, payload)
      if (data && data.success) {
        yield put({ type: 'loadTableSuccess', payload: data })
      }
    },

    *saveTable({ payload }, { call, put }) {
      let data = null
      const callback = payload.callback
      delete payload.callback
      const params = {
        nid: 1,
        images: payload.images
      }
      data = yield call(update, params)
      yield put({ type: 'loadTableSuccess', payload: data })
      callback && callback(data)
    }
  },

  reducers: {
    resetState(state) {
      return { ...state, ...initState }
    },

    loadTableSuccess(state, action) {
      const data = action.payload && action.payload.data
      if (data) {
        return {
          ...state,
          images: data
        }
      }
      return state
    }
  }
}
