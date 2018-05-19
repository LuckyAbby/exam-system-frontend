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

export async function deleteExam(params) {
  return request(`/api/exam/${params.id}`, {
    method: 'DELETE',
  });
}
