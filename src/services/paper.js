import request from '../utils/request';


export async function fetch(params) {
  return request(`/api/paper/${params.id}`);
}

