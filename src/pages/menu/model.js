import {tree, fetchById, add, modified, deleted, fetchResourceListByMenu, addResource, modifiedResource, deletedResource  } from './service'

const Model = {
    namespace: 'menu',
    state: {
      currentUser: {},
    },
    effects: {
        *tree({ payload, callback }, { call, put }) {
          const response = yield call(tree, payload);
          yield put({
            type: 'queryPage',
            payload: response,
          });
          if (callback) callback(response);
        },
        *fetchById({ payload, callback }, { call, put }) {
          const response = yield call(fetchById, payload);
          yield put({
            type: 'fetchByIdInfo',
            payload: response,
          });
          if (callback) callback(response);
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
        *fetchResourceListByMenu({payload, callback}, {call, put}) {
          const response = yield call(fetchResourceListByMenu, payload);
          yield put({
            type: 'fetchResourceListByMenuInfo',
            payload: response,
          });
          if (callback) callback(response);
        },
        *addResource({payload, callback}, {call, put}) {
          const response = yield call(addResource, payload);
          yield put({
            type: 'addResourceInfo',
            payload: response,
          });
          if (callback) callback(response);
        },
        *modifiedResource({payload, callback}, {call, put}) {
          const response = yield call(modifiedResource, payload);
          yield put({
            type: 'modifiedResourceInfo',
            payload: response,
          });
          if (callback) callback(response);
        },
        *deletedResource({payload, callback}, {call, put}) {
          const response = yield call(deletedResource, payload);
          yield put({
            type: 'deletedResourceInfo',
            payload: response,
          });
          if (callback) callback(response);
        },
    },
    reducers: {
    }
};
export default Model;