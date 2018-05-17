import { query as queryExams, createExam } from '../services/exam';

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
    *create({ payload }, { call, put}) {
      const { content } = yield call(createExam, payload);
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
