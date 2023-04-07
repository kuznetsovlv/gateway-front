const BASE_URL = `${globalThis.location.origin}/api/v1`;

const REST_API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

/**
 * @typedef {'GET'|'PUT'|'POST'|'DELETE'} Method
 */

/**
 * @typedef {number|string} StringOrNumber
 */

/**
 * @typedef {{string, StringOrNumber}} Data
 */

/**
 * @typedef {{string, string}} Headers
 */

/**
 * @param {string} url
 * @param {Data} [data]
 * @param {Method} method
 * @param {Headers} [headers = {}]
 * @return {Promise<*>}
 */
const fetchData = ({ url, data, method, headers = {} }) => {
  url = `${BASE_URL}/${url}`;

  const options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  };

  switch (method) {
    case REST_API_METHOD.GET:
    case REST_API_METHOD.DELETE:
      if (data) {
        url = `${url}?${new URLSearchParams(data).toString()}`;
      }
      options.headers = headers;
      break;
    case REST_API_METHOD.POST:
    case REST_API_METHOD.PUT:
      if (data) {
        options.body = JSON.stringify(data);
        options.headers = { ...headers, 'Content-Type': 'application/json' };
      }
      break;
    default:
      return new Promise((_, reject) =>
        reject(new Error(`Unsupported method "${method}" in request ${url}`))
      );
  }

  return fetch(url, options);
};

/**
 * @param {string} url
 * @param {Data} [data]
 * @param {Headers} [headers = {}]
 * @return {Promise<*>}
 */
export const fetchGet = (url, { data, headers = {} } = {}) =>
  fetchData({
    url,
    data,
    headers,
    method: REST_API_METHOD.GET
  });

/**
 * @param {string} url
 * @param {Data} [data]
 * @param {Headers} [headers = {}]
 * @return {Promise<*>}
 */
export const fetchPost = (url, { data, headers = {} } = {}) =>
  fetchData({
    url,
    data,
    headers,
    method: REST_API_METHOD.POST
  });

/**
 * @param {string} url
 * @param {Data} [data]
 * @param {Headers} [headers = {}]
 * @return {Promise<*>}
 */
export const fetchPut = (url, { data, headers = {} } = {}) =>
  fetchData({
    url,
    data,
    headers,
    method: REST_API_METHOD.PUT
  });

/**
 * @param {string} url
 * @param {Data} [data]
 * @param {Headers} [headers = {}]
 * @return {Promise<*>}
 */
export const fetchDelete = (url, { data, headers = {} } = {}) =>
  fetchData({
    url,
    data,
    headers,
    method: REST_API_METHOD.DELETE
  });
