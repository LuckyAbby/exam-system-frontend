import { query as queryExams, getOne } from '../services/exam';

export default {
  namespace: 'exam',

  state: {
    exams: [],
    examPaper: {},
  },

  effects: {
    *fetch(action, { call, put }) {
      const { content } = yield call(queryExams);
      yield put({
        type: 'save',
        payload: {...content },
      });
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
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
