import { stringify } from 'qs';
import request from '@/utils/request';

export async function tree(params) {
    return request(`${APP_CONFIG.endpoint}/menu/tree/${params.applicationId}`);
}

export async function fetchById(params) {
  return request(`${APP_CONFIG.endpoint}/menu/find/${params.menuId}`);
}

export async function add(params) {
  return request(`${APP_CONFIG.endpoint}/menu/add/${params.parentId}`, {
    method: 'POST',
    body: params,
  });
}

export async function modified(params) {
  return request(`${APP_CONFIG.endpoint}/menu/modify`, {
    method: 'POST',
    body: params,
  });
}

export async function deleted(params) {
  return request(`${APP_CONFIG.endpoint}/menu/delete/${params.id}`, {
    method: 'POST',
  });
}

export async function fetchResourceListByMenu(params) {
  return request(`${APP_CONFIG.endpoint}/menu/resource/${params.menuId}`);
}

export async function addResource(params) {
  return request(`${APP_CONFIG.endpoint}/menu/resource/add`, {
    method: 'POST',
    body: params,
  });
}

export async function modifiedResource(params) {
  return request(`${APP_CONFIG.endpoint}/menu/resource/modify`, {
    method: 'POST',
    body: params,
  });
}

export async function deletedResource(params) {
  return request(`${APP_CONFIG.endpoint}/menu/resource/delete/${params.id}`, {
    method: 'POST',
  });
}