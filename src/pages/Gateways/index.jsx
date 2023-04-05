import React, { useEffect } from 'react';

import { useErrorProcessor } from 'ErrorHandler';

export default () => {
  const errorProcessor = useErrorProcessor();

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        throw new Error(`Test error ${Date.now()}`);
      } catch (error) {
        errorProcessor.putError(error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <>Gateways</>;
};
