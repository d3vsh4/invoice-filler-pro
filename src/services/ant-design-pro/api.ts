// @ts-ignore
/* eslint-disable */
import { BASE_URL } from '@/constants';
import { request } from 'umi';

/**Get current users GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>(`${BASE_URL}/api/currentUser`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**Exit login interface POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${BASE_URL}/api/login/outLogin`, {
    method: 'POST',
    ...(options || {}),
  });
}

/**Login interface POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${BASE_URL}/api/login/account`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    data: body,
    ...(options || {}),
  });
}

/**Delete rule DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
