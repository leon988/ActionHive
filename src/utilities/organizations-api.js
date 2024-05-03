import sendRequest from './send-request';

const BASE_URL = '/api/organizations';

export async function getOrganization(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updateOrganization(data, id) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', data);
}

export async function createOrganization(data) {
  return sendRequest(BASE_URL, 'POST', data);
}

export async function getAllOrganizations() {
  return sendRequest(BASE_URL);
}