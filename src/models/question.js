import _ from 'lodash';
import { query, create, deleteQuestion } from '../services/question';

export default {
  namespace: 'question',
  state: {
    list: [],
  },

  effects: {
    *fetch(action, { call, put }) {
      const { content } = yield call(query, action.payload);
      yield put({
        type: 'save',
        payload: content.questions,
      });
    },

    *create({ payload, callback }, { call }) {
      yield call(create, payload);
      if(_.isFunction(callback)) callback();
    },

    *deleteQuestion({ payload, callback }, { call }) {
      yield call(deleteQuestion, payload);
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