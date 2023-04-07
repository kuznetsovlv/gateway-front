import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';

export default observer(() => {
  const store = useStore();
  const errorProcessor = store.get(ERROR_PROCESSOR_KEY);

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
});
