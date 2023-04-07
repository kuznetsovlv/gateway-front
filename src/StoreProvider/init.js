import { toCamelCaseProps } from 'utils';
export default errorProcessor => {
  globalThis.fetch = (function (originalFetch) {
    return async (url, ...arg) => {
      const response = await Reflect.apply(originalFetch, this, [url, ...arg]);

      if (response.ok) {
        return response.json().then(toCamelCaseProps);
      }
      const { status, statusText = `Request ${url} failed.` } = response;

      const error = new Error(`Status code ${status}: ${statusText}`);

      errorProcessor.putError(error);

      throw error;
    };
  })(globalThis.fetch);
};
