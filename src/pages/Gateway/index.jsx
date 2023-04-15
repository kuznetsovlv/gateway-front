import React, { lazy, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Lazy } from 'components';
import { ERROR_PROCESSOR_KEY, useStore } from 'StoreProvider';
import { GatewayStore, GateWayMapStore, GATEWAY_MAP_STORE_KEY } from './store';

const CreateGateway = lazy(() => import('./CreateGateway'));
const Gateway = lazy(() => import('./Gateway'));

export default memo(() => {
  const [searchParams] = useSearchParams();
  const store = useStore();

  const serial = searchParams.get('serial');

  if (!serial) {
    return (
      <Lazy>
        <CreateGateway />
      </Lazy>
    );
  }

  if (!store.has(GATEWAY_MAP_STORE_KEY)) {
    store.set(GATEWAY_MAP_STORE_KEY, new GateWayMapStore());
  }

  const map = store.get(GATEWAY_MAP_STORE_KEY);

  if (!map.has(serial)) {
    map.set(serial, new GatewayStore(serial, store.get(ERROR_PROCESSOR_KEY)));
  }

  return (
    <Lazy>
      <Gateway data={map.get(serial)} />
    </Lazy>
  );
});
