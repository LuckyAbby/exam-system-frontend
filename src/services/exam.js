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

export async function getOne(params) {
  return request(`/api/exam/${params.id}`);
}

export async function update(params) {
  return request('/api/exam', {
    method: 'PUT',
    body: params,
  });
}
