import request from '../utils/request';

export async function query() {
  return request('/api/exam');
}

export async function getOne(params) {
  return request(`/api/exam/${params.id}`);
}

