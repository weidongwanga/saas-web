import {pageSearch, add, modified, deleted  } from './service'

const Model = {
    namespace: 'role',
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
        *add({payload, callback}, {call, put}) {
          const response = yield call(add, payload);
          yield put({
            type: 'addRoleInfo',
            payload: response,
          });
          if (callback) callback(response);
        },
        *modified({payload, callback}, {call, put}) {
          const response = yield call(modified, payload);
          yield put({
            type: 'modifiedInfo',
            payload: response,
          });
          if (callback) callback(response);
        },
        *delete({payload, callback}, {call, put}) {
          const response = yield call(deleted, payload);
          yield put({
            type: 'deleteInfo',
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