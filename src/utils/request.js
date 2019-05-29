// import axios from 'axios';
// import ZetNotification from './notice';
// // const accessToken = localStorage.getItem('token');
// const instance = axios.create({
//     baseURL: 'http://dev.aps.zetyun.cn',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json; charset=utf-8',
//         // 'Authorization': 'Bearer ec2617a9-6857-4266-b504-ece3bbb2a4ec',
//         Cookie: 'APSSESSION=31243245-e8b8-44c7-857d-1550a6e8ffe1',
//     }
// });
// instance.interceptors.request.use(function (config) {
//     console.log(config);
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// // 添加响应拦截器
// instance.interceptors.response.use(function (response) {
//     console.log(response, '拦截');
//     if (response.data.code === 0) {
//         return response.data || {};
//     }
//     if (response.data.code === 590403) {
//         console.log('登出');
//         return;
//     }
//     ZetNotification(response);
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });
// export default instance;
import { notification } from 'antd';
import { join as pathJoin } from 'path';
import { stringify as qsStringify } from 'qs';
import ZetNotification from './notice';
// import './promise';
// import router from 'umi/router';
const apiPrefix = '';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

function changeLoadingStatus(response, loadingId) {
  if (loadingId) {
    window.g_app._store.dispatch({
      type: 'loadingstatus/remove',
      payload: {
        loadingId,
      },
    });
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const loadingId = options && options.body && options.body.loadingId;
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      if (typeof newOptions.body === 'object' && !Array.isArray(newOptions.body)) {
        const { ...body } = newOptions.body;
        delete body.loadingId;
        newOptions.body = body;
      }
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  //
  newOptions.headers = {
    ...newOptions.headers,
    'Access-Control-Allow-Origin': '*',
    sessionId: localStorage.getItem('sessionId'),
    language: localStorage.getItem('intlLang'),
  };

  return fetch(url, newOptions)
    .then((response) => (
      changeLoadingStatus(response, loadingId)
    ))
    .then(checkStatus)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.code === 0) {
        return response.data || {};
      }
      if (response.code === 590403) {
        window.g_app._store.dispatch({
          type: 'user/frontEndLogout',
        });
        return;
      }
      ZetNotification(response);
      console.log(response, 'request error');
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'user/frontEndLogout',
        });
      }
      // environment should not be used
      // if (status === 403) {
      //   router.push('/exception/403');
      //   return;
      // }
      // if (status <= 504 && status >= 500) {
      //   router.push('/exception/500');
      //   return;
      // }
      // if (status >= 404 && status < 422) {
      //   router.push('/404');
      // }
    });
}

/**
 *  the proxy of request
 * @param url
 * @param options
 * @returns {*}
 */
function proxyRequest(url, options) {
  options = options || {};
  const prefix = options.prefix || apiPrefix;
  url = url.startsWith(prefix) ? url : pathJoin(prefix, url);
  return request(url, options);
}

/**
 * @param url
 * @param data   such as : {name = xxx ,age = xx } equel : url ? name=xxx&age=xx
 * @param options
 * @returns {*}
 */
proxyRequest.get = (url, data, options) => {
  options = options || {};
  url = data ? `${url}?${qsStringify(data)}` : url;
  return proxyRequest(url, options);
};
/**
 *
 * @param url
 * @param data
 * @param options
 * @returns {*}
 */
proxyRequest.post = (url, data, options) => {
  options = options || {};
  options.body = data;
  options.method = 'POST';
  return proxyRequest(url, options);
};

/**
 *
 * @param url
 * @param data
 * @param options
 * @returns {*}
 */
proxyRequest.put = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'PUT';
  return proxyRequest(url, options);
};

/**
 *
 * @param url
 * @param data
 * @param options
 * @returns {*}
 */
proxyRequest.delete = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'DELETE';
  return proxyRequest(url, options);
};

/**
 * @param url
 * @param options
 * @returns {*}
 */
export default proxyRequest;
