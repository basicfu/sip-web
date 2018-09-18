import request from './utils/request';

const prefix = '/api';
const base = '/base';
const dict = '/dict';
const permission = '/permission';

export async function allDict() { return request(`${prefix}${dict}/dict/all`, { method: 'GET' }); }

export async function allMenu() { return request(`${prefix}${permission}/menu/all`, { method: 'GET' }); }

export async function user() { return request(`${prefix}${base}/user`, { method: 'GET' }); }
export async function login(params) { return request(`${prefix}${base}/user/login`, { method: 'POST', body: params }); }
export async function logout() { return request(`${prefix}${base}/user/logout`, { method: 'GET' }); }
export async function listUser(params) { return request(`${prefix}${base}/user/list`, { method: 'GET', body: params }); }

// 应用管理
export async function listApp(params) { return request(`${prefix}${base}/app/list`, { method: 'GET', body: params }); }
export async function insertApp(params) { return request(`${prefix}${base}/app/insert`, { method: 'POST', body: params }); }
export async function updateApp(params) { return request(`${prefix}${base}/app/update`, { method: 'POST', body: params }); }
export async function deleteApp(params) { return request(`${prefix}${base}/app/delete`, { method: 'DELETE', body: params }); }

// 用户模版
export async function allUserTemplate(params) { return request(`${prefix}${base}/user-template/all`, { method: 'GET', body: params }); }
export async function listUserTemplate(params) { return request(`${prefix}${base}/user-template/list`, { method: 'GET', body: params }); }
export async function insertUserTemplate(params) { return request(`${prefix}${base}/user-template/insert`, { method: 'POST', body: params }); }
export async function updateUserTemplate(params) { return request(`${prefix}${base}/user-template/update`, { method: 'POST', body: params }); }
export async function deleteUserTemplate(params) { return request(`${prefix}${base}/user-template/delete`, { method: 'DELETE', body: params }); }
