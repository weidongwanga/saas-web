import { stringify } from 'qs';
import request from '@/utils/request';

export async function pageSearch(params) {
  return request(`${APP_CONFIG.endpoint}/user/page?${stringify(params)}`);
}

export async function add(params) {
  return request(`${APP_CONFIG.endpoint}/user/add`, {
    method: 'POST',
    body: params,
  });
}

export async function modified(params) {
  return request(`${APP_CONFIG.endpoint}/user/modify`, {
    method: 'POST',
    body: params,
  });
}