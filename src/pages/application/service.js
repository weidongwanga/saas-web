import { stringify } from 'qs';
import request from '@/utils/request';

export async function pageSearch(params) {
  return request(`${APP_CONFIG.endpoint}/application/page?${stringify(params)}`);
}

export async function add(params) {
  return request(`${APP_CONFIG.endpoint}/application/add`, {
    method: 'POST',
    body: params,
  });
}

export async function modified(params) {
  return request(`${APP_CONFIG.endpoint}/application/modify`, {
    method: 'POST',
    body: params,
  });
}