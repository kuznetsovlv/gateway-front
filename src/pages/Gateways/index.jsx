import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';
import { GATEWAYS_STORE_KEY } from './constants';
import GateWaysStore from './GateWaysStore';
import Main from './Main';

export default observer(() => {
  const store = useStore();

  if (!store.has(GATEWAYS_STORE_KEY)) {
    store.set(
      GATEWAYS_STORE_KEY,
      new GateWaysStore(store.get(ERROR_PROCESSOR_KEY))
    );
  }

  const gateways = store.get(GATEWAYS_STORE_KEY);

  return <Main data={gateways} />;
});
