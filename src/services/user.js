import request from '../utils/request';

export async function queryCurrent() {
  return request('/api/user');
}

export async function register(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}
