import request from './utils/request';

const prefix = '/api';
const base = '/base';

export async function allDict(params) { return request(`${prefix}${base}/dict/all`, { method: 'GET', body: params }); }

// 用户管理
export async function user() { return request(`${prefix}${base}/user`, { method: 'GET' }); }
export async function login(params) { return request(`${prefix}${base}/user/login`, { method: 'POST', body: params }); }
export async function logout() { return request(`${prefix}${base}/user/logout`, { method: 'GET' }); }
export async function listUser(params) { return request(`${prefix}${base}/user/list`, { method: 'GET', body: params }); }
export async function insertUser(params) { return request(`${prefix}${base}/user/insert`, { method: 'POST', body: params }); }
export async function updateUser(params) { return request(`${prefix}${base}/user/update`, { method: 'POST', body: params }); }
export async function deleteUser(params) { return request(`${prefix}${base}/user/delete`, { method: 'DELETE', body: params }); }
export async function suggestUser(params) { return request(`${prefix}${base}/user/suggest/${params.q}`, { method: 'GET' }); }

// 应用管理
export async function listApp(params) { return request(`${prefix}${base}/app/list`, { method: 'GET', body: params }); }
export async function allApp() { return request(`${prefix}${base}/app/all`, { method: 'GET' }); }
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
export async function allRole(params) { return request(`${prefix}${base}/role/all`, { method: 'GET', body: params }); }
export async function listRole(params) { return request(`${prefix}${base}/role/list`, { method: 'GET', body: params }); }
export async function listRoleUser(params) { return request(`${prefix}${base}/role/list/${params.id}/user`, { method: 'GET' }); }
export async function listRoleMenu(params) { return request(`${prefix}${base}/role/list/${params.id}/menu`, { method: 'GET' }); }
export async function listRolePermission(params) { return request(`${prefix}${base}/role/list/${params.id}/permission`, { method: 'GET' }); }
export async function insertRole(params) { return request(`${prefix}${base}/role/insert`, { method: 'POST', body: params }); }
export async function insertRoleUser(params) { return request(`${prefix}${base}/role/insert/user`, { method: 'POST', body: params }); }
export async function insertRoleMenu(params) { return request(`${prefix}${base}/role/insert/menu`, { method: 'POST', body: params }); }
export async function insertRolePermission(params) { return request(`${prefix}${base}/role/insert/permission`, { method: 'POST', body: params }); }
export async function updateRole(params) { return request(`${prefix}${base}/role/update`, { method: 'POST', body: params }); }
export async function deleteRole(params) { return request(`${prefix}${base}/role/delete`, { method: 'DELETE', body: params }); }
export async function deleteRoleUser(params) { return request(`${prefix}${base}/role/delete/user`, { method: 'DELETE', body: params }); }
export async function deleteRoleMenu(params) { return request(`${prefix}${base}/role/delete/menu`, { method: 'DELETE', body: params }); }
export async function deleteRolePermission(params) { return request(`${prefix}${base}/role/delete/permission`, { method: 'DELETE', body: params }); }

// 菜单
export async function allMenu(params) { return request(`${prefix}${base}/menu/all`, { method: 'GET', body: params }); }
export async function listMenu(params) { return request(`${prefix}${base}/menu/list`, { method: 'GET', body: params }); }
export async function listMenuResource(params) { return request(`${prefix}${base}/menu/list/${params.id}/resource`, { method: 'GET', body: { ...params, id: undefined } }); }
export async function insertMenu(params) { return request(`${prefix}${base}/menu/insert`, { method: 'POST', body: params }); }
export async function insertMenuResource(params) { return request(`${prefix}${base}/menu/insert/resource`, { method: 'POST', body: params }); }
export async function updateMenu(params) { return request(`${prefix}${base}/menu/update`, { method: 'POST', body: params }); }
export async function updateDisplayMenu(params) { return request(`${prefix}${base}/menu/update/${params.id}/${params.display}`, { method: 'POST' }); }
export async function updateSortMenu(params) { return request(`${prefix}${base}/menu/update/sort/${params.dragId}/${params.hoverId}`, { method: 'POST' }); }
export async function deleteMenu(params) { return request(`${prefix}${base}/menu/delete`, { method: 'DELETE', body: params }); }
export async function deleteMenuResource(params) { return request(`${prefix}${base}/menu/delete/resource`, { method: 'DELETE', body: params }); }

// 权限
export async function allPermission(params) { return request(`${prefix}${base}/permission/all`, { method: 'GET', body: params }); }
export async function listPermission(params) { return request(`${prefix}${base}/permission/list`, { method: 'GET', body: params }); }
export async function listPermissionResource(params) { return request(`${prefix}${base}/permission/list/${params.id}/resource`, { method: 'GET', body: { ...params, id: undefined } }); }
export async function insertPermission(params) { return request(`${prefix}${base}/permission/insert`, { method: 'POST', body: params }); }
export async function insertPermissionResource(params) { return request(`${prefix}${base}/permission/insert/resource`, { method: 'POST', body: params }); }
export async function updatePermission(params) { return request(`${prefix}${base}/permission/update`, { method: 'POST', body: params }); }
export async function deletePermission(params) { return request(`${prefix}${base}/permission/delete`, { method: 'DELETE', body: params }); }
export async function deletePermissionResource(params) { return request(`${prefix}${base}/permission/delete/resource`, { method: 'DELETE', body: params }); }
export async function importPermission(params) { return request(`${prefix}${base}/permission/import`, { method: 'POST', body: params }); }
export async function exportPermission(params) { return request(`${prefix}${base}/permission/export`, { method: 'GET', body: params }); }

// 资源
export async function allResource(params) { return request(`${prefix}${base}/resource/all`, { method: 'GET', body: params }); }
export async function syncResource(params) { return request(`${prefix}${base}/resource/sync`, { method: 'POST', body: params }); }
export async function listResource(params) { return request(`${prefix}${base}/resource/list`, { method: 'GET', body: params }); }
export async function insertResource(params) { return request(`${prefix}${base}/resource/insert`, { method: 'POST', body: params }); }
export async function updateResource(params) { return request(`${prefix}${base}/resource/update`, { method: 'POST', body: params }); }
export async function deleteResource(params) { return request(`${prefix}${base}/resource/delete`, { method: 'DELETE', body: params }); }
export async function suggestResource(params) { return request(`${prefix}${base}/resource/suggest`, { method: 'GET', body: params }); }
