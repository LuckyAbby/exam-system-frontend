import _ from 'lodash';
import { query, create, deleteQuestion, fetchOne, updateQuestion } from '../services/question';

export default {
  namespace: 'question',
  state: {
    list: [],
    info: {}, // 某个question
  },

  effects: {
    *fetch(action, { call, put }) {
      const { content } = yield call(query, action.payload);
      yield put({
        type: 'save',
        payload: content.questions,
      });
    },

    *create({ payload }, { call }) {
      yield call(create, payload);
    },

    *update({ payload }, { call }) {
      yield call(updateQuestion, payload);
    },

    *deleteQuestion({ payload, callback }, { call }) {
      yield call(deleteQuestion, payload);
      if(_.isFunction(callback)) callback();
    },

    *getOne({ payload }, { call, put }) {
      const { content }  = yield call(fetchOne, payload);
      yield put({
        type: 'saveOne',
        payload: content.question,
      });
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
        info: payload,
      }
    },
  },
};