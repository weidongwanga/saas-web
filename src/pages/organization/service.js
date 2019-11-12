import { stringify } from 'qs';
import request from '@/utils/request';

export async function pageSearch(params) {
    return request(`${APP_CONFIG.endpoint}/organization/orgs?${stringify(params)}`);
}

export async function addOrganization(params) {
  return request(`${APP_CONFIG.endpoint}/organization/add`, {
    method: 'POST',
    body: params,
  });
}

