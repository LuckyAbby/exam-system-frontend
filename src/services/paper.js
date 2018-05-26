import request from '../utils/request';

export async function query(params) {
  return request(`/api/paper?exam_id=${params.exam_id}`);
}

export async function create(params) {
  return request('/api/paper', {
    method: 'POST',
    body: params,
  });
}

export async function deletePaper(params) {
  return request(`/api/paper/${params.id}`, {
    method: 'DELETE',
  });
}

export async function getOne(params) {
  return request(`/api/paper/${params.id}`);
}

export async function update(params) {
  return request(`/api/paper`, {
    method: 'PUT',
    body: params,
  });
}