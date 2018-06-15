import * as paperService from '../services/paper';

export default {
  namespace: 'paper',

  state: {
    paper: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { content } = yield call(paperService.fetch, payload);
      if (content.paper) {
        const { paper } = content;
        // eslint-disable-next-line
        const time = paper.exam_info.time;
          yield put({
          type: 'global/startCountdown',
          payload: { COUNT: time * 60 },
        });
      }
    
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
