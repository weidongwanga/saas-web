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

export async function userAccountList(params) {
  return request(`${APP_CONFIG.endpoint}/user/${params.id}/account/list`, {
    method: 'POST',
  });
}

export async function userOrgTree(params) {
  return request(`${APP_CONFIG.endpoint}/user/${params.id}/organization/tree`, {
    method: 'POST',
  });
}

export async function saveUserOrg(params) {
  return request(`${APP_CONFIG.endpoint}/user/org/${params.userId}/${params.orgId}`, {
    method: 'POST',
  });
}