import fetch from 'dva/fetch';

export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  const auth = window.localStorage.getItem('auth');
  let headers = { Accept: 'application/json', ...newOptions.headers };
  if (auth) {
    headers.Authorization = JSON.parse(auth).token;
  }
  let body;
  if (newOptions.method !== 'GET') {
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
  }else {
    if (newOptions.body) {
      for (let key of Object.keys(newOptions.body)) {
        if (key) {
          const value = newOptions.body[key];
          let s = encodeURIComponent(value);
          const inc = url.includes("?") ? "&" : "?";
          url += `${inc}${key}=${s}`;
        }
      }
    }
  }
  newOptions.headers = headers;
  newOptions.body = body;
  // url="http://sip-dev.dmka.cn/dict/dict/all";
  console.log(url)
  return fetch(url, newOptions)
    .then((response) => {
      if (response.status !== 200) {
        // message.error('服务器开小差了，请稍候再来呦！');
        return { success: false };
      } else {
        console.log('hello')
        return response.json().then((result) => {
          if (result.success === false) {
            if (result.msg !== undefined && result.msg !== '') {
              // message.error(result.msg);
            }
            if (result.code === 5) {
              window.localStorage.removeItem('auth');
              window.location.href = '/login';
            }
            return { success: false };
          }
          if (result.msg !== undefined && result.msg !== '') {
            // message.success(result.msg);
          }
          return result;
        });
      }
    })
    .catch((error) => {
      console.log('hello123')
      const { response } = error;
      let msg;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        msg = data.message || statusText;
      } else {
        msg = error.message || '网络错误';
      }
      // message.error(msg);
      return { success: false };
    });
}
