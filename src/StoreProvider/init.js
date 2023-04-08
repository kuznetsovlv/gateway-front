import './ErrorProcessor';
import { toCamelCaseProps } from 'utils';

/**
 * @param {ErrorProcessor} errorProcessor
 */
export default errorProcessor => {
  globalThis.fetch = (function (originalFetch) {
    return async (...args) => {
      return (async (url, ...args) => {
        const response = await Reflect.apply(originalFetch, this, [
          url,
          ...args
        ]);

        if (response.ok) {
          return response.json().then(toCamelCaseProps);
        }
        const { status, statusText = `Request ${url} failed.` } = response;

        throw new Error(`Status code ${status}: ${statusText}`);
      })(...args).then(toCamelCaseProps, errorProcessor.putError);
    };
  })(globalThis.fetch);
};
