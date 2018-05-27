import * as paperService from '../services/paper';

export default {
  namespace: 'paper',

  state: {
    paper: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('payload :',payload);
      
      const { content } = yield call(paperService.fetch, payload);
      yield put({
        type: 'save',
        payload: {...content },
      });
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
