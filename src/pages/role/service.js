import { stringify } from 'qs';
import request from '@/utils/request';

export async function pageSearch(params) {
    return request(`${APP_CONFIG.endpoint}/role/page?${stringify(params)}`);
}

export async function add(params) {
  return request(`${APP_CONFIG.endpoint}/role/add`, {
    method: 'POST',
    body: params,
  });
}

export async function modified(params) {
  return request(`${APP_CONFIG.endpoint}/role/modify`, {
    method: 'POST',
    body: params,
  });
}

export async function deleted(params) {
  return request(`${APP_CONFIG.endpoint}/role/delete/${params.id}`, {
    method: 'POST',
  });
}

