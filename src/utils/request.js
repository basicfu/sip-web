import fetch from 'dva/fetch';
import notify from 'notify';
import config from 'config';
import { dealObjectValue } from 'utils';

export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  const auth = window.localStorage.getItem('auth');
  let headers = { Accept: 'application/json', ...newOptions.headers };
  // if (process.env.BABEL_ENV === 'dev') {
    headers.app = config.app;
  // }
  if (auth) {
    headers.Authorization = JSON.parse(auth).token;
  }
  let body;
  if (newOptions.method !== 'GET') {
    newOptions.body = dealObjectValue(newOptions.body);
    if (!newOptions.type) {
      body = JSON.stringify(newOptions.body);
      headers = { ...headers, 'Content-Type': 'application/json; charset=utf-8' };
    } else if (newOptions.type && newOptions.type === 'file') {
      body = newOptions.body;
      headers = { ...headers, 'Content-Type': 'multipart/form-data; charset=utf-8' };
      // 'Content-Type': 'multipart/form-data; charset=utf-8'//传带文件的自动处理不用手动添加
    } else if (newOptions.type && newOptions.type === 'form') {
      body = newOptions.body;
      headers = { ...headers, 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' };
    }
  } else if (newOptions.body) {
    Object.keys(newOptions.body).forEach(key => {
      const value = newOptions.body[key];
      const s = encodeURIComponent(value);
      const inc = url.includes('?') ? '&' : '?';
      // 排除undefined、null、''
      if (s !== 'undefined' && s !== null && s !== '') {
        url += `${inc}${key}=${s}`;
      }
    });
  }
  newOptions.headers = headers;
  newOptions.body = body;
  return fetch(url, newOptions)
    .then(response => {
      if (response.status !== 200) {
        notify.error('服务器开小差了，请稍候再来呦！');
        return { success: false };
      }
      return response.json().then((result) => {
        if (result.success === false) {
          if (result.msg !== undefined && result.msg !== '') {
            notify.error(result.msg);
          }
          if (result.code === 5) {
            window.localStorage.removeItem('auth');
            window.location.href = '/login';
          }
          return { success: false };
        }
        if (result.msg !== undefined && result.msg !== '') {
          notify.success(result.msg);
        }
        return result;
      });
    })
    .catch((error) => {
      const { response } = error;
      let msg;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        msg = data.message || statusText;
      } else {
        msg = error.message || '网络错误';
      }
      notify.error(msg);
      return { success: false };
    });
}
