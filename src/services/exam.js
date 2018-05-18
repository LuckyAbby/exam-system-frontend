import request from '../utils/request';

export async function query() {
  return request('/api/exam');
}

export async function create(params) {
  return request('/api/exam', {
    method: 'POST',
    body: params,
  });
}
