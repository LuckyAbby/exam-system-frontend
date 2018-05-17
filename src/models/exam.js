import { query as queryExams } from '../services/exam';

export default {
  namespace: 'exam',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const { content } = yield call(queryExams);
      yield put({
        type: 'save',
        payload: content.exams,
      });
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
