import {pageSearch, addData, modifiedData  } from './service'

const Model = {
    namespace: 'dataDetail',
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
        *addData({payload, callback}, {call, put}) {
            const response = yield call(addData, payload);
            yield put({
              type: 'addDataInfo',
              payload: response,
            });
            if (callback) callback(response);
          },
          *modifiedData({payload, callback}, {call, put}) {
            const response = yield call(modifiedData, payload);
            yield put({
              type: 'modifiedDataInfo',
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