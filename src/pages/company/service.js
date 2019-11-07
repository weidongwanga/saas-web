import { stringify } from 'qs';
import request from '@/utils/request';

export async function pageSearch(params) {
    return request(`${APP_CONFIG.endpoint}/fmCompany/page?${stringify(params)}`,{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });
}

export async function addCompany(params) {
    return request(`${APP_CONFIG.endpoint}/fmCompany/add`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });
  }
  