import request from '../utils/request';

export async function query(params) {
  return request(`/api/question?exam_id=${params.exam_id}`);
}

export async function create(params) {
  return request('/api/question', {
    method: 'POST',
    body: params,
  });
}

export async function deleteQuestion(params) {
  return request(`/api/question/${params.id}`, {
    method: 'DELETE',
  })
}