import { stringify } from 'qs';
import request from '@/utils/request';

export async function pageSearch(params) {
    return request(`${APP_CONFIG.endpoint}/data/page?${stringify(params)}`,{
    });
}

export async function addData(params) {
    return request(`${APP_CONFIG.endpoint}/data/add`, {
      method: 'POST',
      body: params,
    });
  }
  

  export async function modifiedData(params) {
    return request(`${APP_CONFIG.endpoint}/data/modify`, {
      method: 'POST',
      body: params,
    });
  }
  
  export async function deleteData(params) {
    return request(`${APP_CONFIG.endpoint}/data/delete/${params.id}`, {
      method: 'POST',
    });
  }


  export async function pageSearchDetail(params) {
    return request(`${APP_CONFIG.endpoint}/data/detail/page?${stringify(params)}`,{
    });
}

export async function addDataDetail(params) {
    return request(`${APP_CONFIG.endpoint}/data/detail/add`, {
      method: 'POST',
      body: params,
    });
  }
  

  export async function modifiedDataDetail(params) {
    return request(`${APP_CONFIG.endpoint}/data/detail/modify`, {
      method: 'POST',
      body: params,
    });
  }
  
  export async function deleteDataDetail(params) {
    return request(`${APP_CONFIG.endpoint}/data/detail/delete/${params.id}`, {
      method: 'POST',
    });
  }