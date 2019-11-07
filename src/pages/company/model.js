import {pageSearch, addCompany  } from './service'

const Model = {
    namespace: 'company',
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
        *addCompany({payload, callback}, {call, put}) {
            const response = yield call(addCompany, payload);
            yield put({
              type: 'addCompanyInfo',
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