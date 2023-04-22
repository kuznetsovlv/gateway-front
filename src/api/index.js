import 'types';
import { fetchGet, fetchPost, fetchPut, fetchDelete } from './fetch';

const PATH = {
  GATEWAYS: 'gateways',
  GATEWAY: 'gateway',
  DEVICES: 'devices',
  DEVICE: 'device',
  BIND: 'bind',
  UNBIND: 'unbind'
};

/**
 * @return {Promise<SimpleGateway[]>}
 */
export const getGatewayList = () => fetchGet(PATH.GATEWAYS);

/**
 * @param {string} serial
 * @return {Promise<Gateway>}
 */
export const getGateway = serial =>
  fetchGet(PATH.GATEWAY, { data: { serial } });

/**
 * @param {string} [serial]
 * @param {string} name
 * @param {number} ip
 * @param {number[]} [devices = []]
 * @return {Promise<string>}
 */
export const putGateway = ({ serial, name, ip, devices = [] }) => {
  const data = { name, ip: ip << 0, devices };
  if (serial) {
    data.serial = serial;
  }
  return fetchPut(PATH.GATEWAY, { data }).then(({ serial }) => serial);
};

/**
 * @param {string} serial
 * @return {Promise<void>}
 */
export const deleteGateway = serial =>
  fetchDelete(PATH.GATEWAY, { data: { serial } });

/**
 * @param {string} [serial]
 * @return {Promise<SimpleDevice[]>}
 */
export const getDeviceList = serial => {
  const data = {};

  if (serial) {
    data.serial = serial;
  }
  return fetchGet(PATH.DEVICES, { data });
};

/**
 * @param {number} uid
 * @return {Promise<Device>}
 */
export const getDevice = uid => fetchGet(PATH.DEVICE, { data: { uid } });

/**
 * @param {number} [uid]
 * @param {string} [vendor]
 * @param {Status} [status]
 * @return {Promise<number>}
 */
export const putDevice = ({ uid, vendor, status }) => {
  const data = {};
  if (uid) {
    data.uid = uid;
  }

  if (vendor) {
    data.vendor = vendor;
  }

  if (status) {
    data.status = status;
  }

  return fetchPut(PATH.DEVICE, { data }).then(({ uid }) => uid);
};

/**
 * @param {number} uid
 * @return {Promise<void>}
 */
export const deleteDevice = uid => fetchDelete(PATH.DEVICE, { data: { uid } });

/**
 * @param {string} serial
 * @param {number[]} [devices = []
 * @return {Promise<number[]>}
 */
export const bind = (serial, devices = []) => {
  if (!devices.length) {
    return new Promise((_, reject) =>
      reject(new Error('No devices to bind with gateway'))
    );
  }
  if (!serial) {
    return new Promise((_, reject) =>
      reject(new Error('No gateway to bind with devices'))
    );
  }

  return fetchPost(PATH.BIND, { data: { serial, devices } }).then(
    ({ bound }) => bound
  );
};

/**
 * @param {string} serial
 * @param {number[]} [devices = []
 * @return {Promise<void>}
 */
export const unbind = (serial, devices = []) => {
  if (!devices.length) {
    return new Promise((_, reject) =>
      reject(new Error('No devices to bind with gateway'))
    );
  }
  if (!serial) {
    return new Promise((_, reject) =>
      reject(new Error('No gateway to bind with devices'))
    );
  }

  return fetchPost(PATH.UNBIND, { data: { serial, devices } });
};
