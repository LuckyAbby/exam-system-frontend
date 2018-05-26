import _ from 'lodash';
import { query, create, deletePaper, getOne, update } from '../services/paper';

export default {
  namespace: 'paper',
  state: {
    list: [],
    paperDetail: {},
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

    *getOne(action, { call, put }) {
      const { content } = yield call(getOne, action.payload);
      yield put({
        type: 'saveOne',
        payload: content.paper,
      })
    },

    *update({ payload, callback }, { call }) {
      yield call(update, payload);
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

    saveOne(state, { payload }) {
      return {
        ...state,
        paperDetail: payload,
      }
    },
  },
};