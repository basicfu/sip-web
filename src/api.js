import request from './utils/request';

const prefix = '/api';
const base = '/base';
const dict = '/dict';
const permission = '/permission';

export async function allDict() { return request(`${prefix}${dict}/dict/all`, { method: 'GET' }); }

// 用户管理
export async function user() { return request(`${prefix}${base}/user`, { method: 'GET' }); }
export async function login(params) { return request(`${prefix}${base}/user/login`, { method: 'POST', body: params }); }
export async function logout() { return request(`${prefix}${base}/user/logout`, { method: 'GET' }); }
export async function listUser(params) { return request(`${prefix}${base}/user/list`, { method: 'GET', body: params }); }
export async function insertUser(params) { return request(`${prefix}${base}/user/insert`, { method: 'POST', body: params }); }
export async function updateUser(params) { return request(`${prefix}${base}/user/update`, { method: 'POST', body: params }); }
export async function deleteUser(params) { return request(`${prefix}${base}/user/delete`, { method: 'DELETE', body: params }); }

// 应用管理
export async function listApp(params) { return request(`${prefix}${base}/app/list`, { method: 'GET', body: params }); }
export async function insertApp(params) { return request(`${prefix}${base}/app/insert`, { method: 'POST', body: params }); }
export async function updateApp(params) { return request(`${prefix}${base}/app/update`, { method: 'POST', body: params }); }
export async function deleteApp(params) { return request(`${prefix}${base}/app/delete`, { method: 'DELETE', body: params }); }

// 应用服务
export async function listAppService(params) { return request(`${prefix}${base}/app-service/list`, { method: 'GET', body: params }); }
export async function allAppService(params) { return request(`${prefix}${base}/app-service/all`, { method: 'GET', body: params }); }
export async function insertAppService(params) { return request(`${prefix}${base}/app-service/insert`, { method: 'POST', body: params }); }
export async function updateAppService(params) { return request(`${prefix}${base}/app-service/update`, { method: 'POST', body: params }); }
export async function deleteAppService(params) { return request(`${prefix}${base}/app-service/delete`, { method: 'DELETE', body: params }); }

// 应用Secret
export async function listAppSecret(params) { return request(`${prefix}${base}/app-secret/list`, { method: 'GET', body: params }); }
export async function allAppSecret(params) { return request(`${prefix}${base}/app-secret/all`, { method: 'GET', body: params }); }
export async function insertAppSecret(params) { return request(`${prefix}${base}/app-secret/insert`, { method: 'POST', body: params }); }
export async function updateAppSecret(params) { return request(`${prefix}${base}/app-secret/update`, { method: 'POST', body: params }); }
export async function deleteAppSecret(params) { return request(`${prefix}${base}/app-secret/delete`, { method: 'DELETE', body: params }); }

// 用户模版
export async function allUserTemplate(params) { return request(`${prefix}${base}/user-template/all`, { method: 'GET', body: params }); }
export async function listUserTemplate(params) { return request(`${prefix}${base}/user-template/list`, { method: 'GET', body: params }); }
export async function insertUserTemplate(params) { return request(`${prefix}${base}/user-template/insert`, { method: 'POST', body: params }); }
export async function updateUserTemplate(params) { return request(`${prefix}${base}/user-template/update`, { method: 'POST', body: params }); }
export async function deleteUserTemplate(params) { return request(`${prefix}${base}/user-template/delete`, { method: 'DELETE', body: params }); }


// 角色
export async function allRole(params) { return request(`${prefix}${permission}/role/all`, { method: 'GET', body: params }); }
export async function listRole(params) { return request(`${prefix}${permission}/role/list`, { method: 'GET', body: params }); }
export async function insertRole(params) { return request(`${prefix}${permission}/role/insert`, { method: 'POST', body: params }); }
export async function insertRoleUser(params) { return request(`${prefix}${permission}/role/insert/user`, { method: 'POST', body: params }); }
export async function insertRoleMenu(params) { return request(`${prefix}${permission}/role/insert/menu`, { method: 'POST', body: params }); }
export async function insertRolePermission(params) { return request(`${prefix}${permission}/role/insert/permission`, { method: 'POST', body: params }); }
export async function updateRole(params) { return request(`${prefix}${permission}/role/update`, { method: 'POST', body: params }); }
export async function deleteRole(params) { return request(`${prefix}${permission}/role/delete`, { method: 'DELETE', body: params }); }
export async function deleteRoleUser(params) { return request(`${prefix}${permission}/role/delete/user`, { method: 'DELETE', body: params }); }
export async function deleteRoleMenu(params) { return request(`${prefix}${permission}/role/delete/menu`, { method: 'DELETE', body: params }); }
export async function deleteRolePermission(params) { return request(`${prefix}${permission}/role/delete/permission`, { method: 'DELETE', body: params }); }

// 菜单
export async function allMenu(params) { return request(`${prefix}${permission}/menu/all`, { method: 'GET', body: params }); }
export async function listMenu(params) { return request(`${prefix}${permission}/menu/list`, { method: 'GET', body: params }); }
export async function insertMenu(params) { return request(`${prefix}${permission}/menu/insert`, { method: 'POST', body: params }); }
export async function insertMenuResource(params) { return request(`${prefix}${permission}/menu/insert/resource`, { method: 'POST', body: params }); }
export async function updateMenu(params) { return request(`${prefix}${permission}/menu/update`, { method: 'POST', body: params }); }
export async function deleteMenu(params) { return request(`${prefix}${permission}/menu/delete`, { method: 'DELETE', body: params }); }
export async function deleteMenuResource(params) { return request(`${prefix}${permission}/menu/delete/resource`, { method: 'DELETE', body: params }); }

// 权限
export async function allPermission(params) { return request(`${prefix}${permission}/permission/all`, { method: 'GET', body: params }); }
export async function listPermission(params) { return request(`${prefix}${permission}/permission/list`, { method: 'GET', body: params }); }
export async function insertPermission(params) { return request(`${prefix}${permission}/permission/insert`, { method: 'POST', body: params }); }
export async function insertPermissionResource(params) { return request(`${prefix}${permission}/permission/insert/resource`, { method: 'POST', body: params }); }
export async function updatePermission(params) { return request(`${prefix}${permission}/permission/update`, { method: 'POST', body: params }); }
export async function deletePermission(params) { return request(`${prefix}${permission}/permission/delete`, { method: 'DELETE', body: params }); }
export async function deletePermissionResource(params) { return request(`${prefix}${permission}/permission/delete/resource`, { method: 'DELETE', body: params }); }

// 资源
export async function allResource(params) { return request(`${prefix}${permission}/resource/all`, { method: 'GET', body: params }); }
export async function listResource(params) { return request(`${prefix}${permission}/resource/list`, { method: 'GET', body: params }); }
export async function insertResource(params) { return request(`${prefix}${permission}/resource/insert`, { method: 'POST', body: params }); }
export async function updateResource(params) { return request(`${prefix}${permission}/resource/update`, { method: 'POST', body: params }); }
export async function deleteResource(params) { return request(`${prefix}${permission}/resource/delete`, { method: 'DELETE', body: params }); }
