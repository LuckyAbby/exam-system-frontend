import _ from 'lodash';
import { query, create, deleteExaminee } from '../services/examinee';

export default{
  namespace: 'examinee',

  state: {
    list: [],
  },

  effects: {
    *fetch(action, { call, put }) {
      const { content } = yield call(query, action.payload);
      yield put({
        type: 'save',
        payload: content.examinees,
      })
    },

    *create({ payload, callback }, { call }) {
      const res = yield call(create, payload);
      if (res.success) {
        if(_.isFunction(callback)) callback();
      }
    },

    *deleteExaminee({ payload, callback }, { call }) {
      yield call(deleteExaminee, payload);
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
}