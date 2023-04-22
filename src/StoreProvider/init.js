import './ErrorProcessor';
import { toCamelCaseProps } from 'utils';

/**
 * @param {ErrorProcessor} errorProcessor
 */
export default errorProcessor => {
  globalThis.fetch = (function (originalFetch) {
    return async (...args) => {
      return (async (...args) => {
        const response = await Reflect.apply(originalFetch, this, [...args]);

        if (response.ok) {
          switch (response.headers.get('Content-Type')) {
            case 'application/json':
              return response.json().then(toCamelCaseProps);
            default:
              return response.blob();
          }
        }
        const { status, statusText = `Request ${response.url} failed.` } =
          response;

        if (response.headers.get('Content-Type') === 'application/json') {
          return response.json().then(({ message = statusText }) => {
            throw new Error(`Status code ${status}: ${message}`);
          });
        }

        throw new Error(`Status code ${status}: ${statusText}`);
      })(...args).then(toCamelCaseProps, errorProcessor.putError);
    };
  })(globalThis.fetch);
};
