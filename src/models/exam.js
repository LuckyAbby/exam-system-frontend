import _ from 'lodash';
import { query as queryExams, create } from '../services/exam';

export default {
  namespace: 'exam',

  state: {
    list: [],
  },

  effects: {
    *fetch(action, { call, put }) {
      const { content } = yield call(queryExams);
      yield put({
        type: 'save',
        payload: content.exams,
      });
    },

    *create({ payload, callback }, { call }) {
      yield call(create, payload);
      if (_.isFunction(callback)) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
