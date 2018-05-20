import request from '../utils/request';

export async function query(params) {
  return request(`/api/examinee?exam_id=${params.exam_id}`);
}

export async function create(params) {
  return request('/api/examinee', {
    method: 'POST',
    body: params,
  });
}

export async function deleteExaminee(params) {
  return request(`/api/examinee/${params.id}`, {
    method: 'DELETE',
  })
}