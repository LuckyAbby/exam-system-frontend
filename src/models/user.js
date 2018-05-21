import { queryCurrent } from '../services/user';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const { content } = yield call(queryCurrent);
      const { user } = content;
      yield put({
        type: 'saveCurrentUser',
        payload: user,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
};
