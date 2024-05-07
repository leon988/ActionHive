import sendRequest from './send-request';

const BASE_URL = '/api/volunteers';

export async function getVolunteer(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updateVolunteer(data, id) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', data);
}

export async function createVolunteer(data) {
  return sendRequest(BASE_URL, 'POST', data);
}

export async function getAllVolunteers() {
  return sendRequest(BASE_URL);
}