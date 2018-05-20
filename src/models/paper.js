import _ from 'lodash';
import { query, create, deletePaper } from '../services/paper';

export default {
  namespace: 'paper',
  state: {
    list: [],
  },

  effects: {
    *fetch(action, { call, put }) {
      const { content } = yield call(query, action.payload);
      yield put({
        type: 'save',
        payload: content.papers,
      })
    },

    *create({ payload, callback }, { call }) {
      yield call(create, payload);
      if(_.isFunction(callback)) callback();
    },

    *deletePaper({ payload, callback }, { call }) {
      yield call(deletePaper, payload);
      if(_.isFunction(callback)) callback();
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    },
  },
};