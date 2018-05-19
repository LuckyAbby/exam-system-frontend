import _ from 'lodash';
import { query as queryExams, create, deleteExam, getOne } from '../services/exam';

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

    *deleteExam({ payload, callback }, { call }) {
      yield call(deleteExam, payload);
      if (_.isFunction(callback)) callback();
    },

    *getOne(action, { call, put }) {
      const { content } = yield call(getOne, action.payload);
      yield put({
        type: 'saveOne',
        payload: content.exam,
      })
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveOne(state, action) {
      return {
        ...state,
        config: action.payload,
      }
    },
  },
};
