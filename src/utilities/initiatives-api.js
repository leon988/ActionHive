import sendRequest from './send-request';

const BASE_URL = '/api/initiatives';

export async function createInitiative(data) {
  return sendRequest(BASE_URL, 'POST', data);
}

export async function getInitiative(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updateInitiative(data, id) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', data);
}

export async function deleteInitiative(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export async function getAllInitiatives() {
  return sendRequest(BASE_URL);
}
