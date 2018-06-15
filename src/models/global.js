import Cookies from 'universal-cookie';
import _ from 'lodash';


const cookies = new Cookies();

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


// 短信验证码剩余倒计时绝对时间在 cookie 中的键值
export const SMS_TIME = 'sms-time';
// 短信验证码默认倒计时时间
// export const COUNT = 60;

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    smsCount: null,
  },

  effects: {
    * startCountdown({ payload }, { put }) {
      const { COUNT } = payload;
      
      // 读取倒计时结束时间
      const time = _.parseInt(cookies.get(SMS_TIME) || 0);      
      const now = new Date().getTime();
      // console.log('time: ', time);
      // console.log('now: ', now);
      // 上一个倒计时还没到
      if (time > now) return;
      // 设置倒计时结束的绝对时间
      cookies.set(SMS_TIME, new Date().getTime() + (COUNT * 1000));
      // console.log('COUNT: ', COUNT);
      
      yield put({ type: 'save', payload: { smsCount: COUNT } });
      yield put({ type: 'countdown' });
    },

    * countdown(action, { call, put }) {
      while (true) {
        const time = _.parseInt(cookies.get(SMS_TIME) || 0);
        const now = new Date().getTime();
        if (now > time) {
          yield put({ type: 'save', payload: { smsCount: 0 } });
          break;
        }
        const count = _.parseInt((time - now) / 1000);
        yield call(delay, 1000);
        yield put({ type: 'save', payload: { smsCount: count } });
      }
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
