import { pageSearch, addData, modifiedData, pageSearchDetail, addDataDetail, modifiedDataDetail, deleteDataDetail } from './service'

const Model = {
  namespace: 'data',
  state: {
    currentUser: {},
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(pageSearch, payload);
      yield put({
        type: 'queryPage',
        payload: response,
      });
    },
    *addData({ payload, callback }, { call, put }) {
      const response = yield call(addData, payload);
      yield put({
        type: 'addDataInfo',
        payload: response,
      });
      if (callback) callback(response);
    },
    *modifiedData({ payload, callback }, { call, put }) {
      const response = yield call(modifiedData, payload);
      yield put({
        type: 'modifiedDataInfo',
        payload: response,
      });
      if (callback) callback(response);
    },
    *pageSearchDetail({ payload, callback }, { call, put }) {
      const response = yield call(pageSearchDetail, payload);
      yield put({
        type: 'pageSearchDetailInfo',
        payload: response,
      });
      if (callback) callback(response);
    },
    *addDataDetail({ payload, callback }, { call, put }) {
      const response = yield call(addDataDetail, payload);
      yield put({
        type: 'addDataDetailnfo',
        payload: response,
      });
      if (callback) callback(response);
    },
    *modifiedDataDetail({ payload, callback }, { call, put }) {
      const response = yield call(modifiedDataDetail, payload);
      yield put({
        type: 'modifiedDataDetailInfo',
        payload: response,
      });
      if (callback) callback(response);
    },
    *deleteDataDetail({ payload, callback }, { call, put }) {
      const response = yield call(deleteDataDetail, payload);
      yield put({
        type: 'deleteDataDetailInfo',
        payload: response,
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    queryPage(state, action) {
      return {
        ...state,
        data: action.payload && action.payload.data ? action.payload.data.records : [],
        pagination: {
          current: action.payload && action.payload.data ? action.payload.data.current : 1,
          total: action.payload && action.payload.data ? action.payload.data.total : 0,
          pageSize: action.payload && action.payload.data ? action.payload.data.size : 10,
          showTotal: () => {
            return '总数：' + action.payload && action.payload.data ? action.payload.data.total : 0;
          },
        },
      };
    },
  }
};
export default Model;