import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';
import { Loader } from 'components';
import { GATEWAYS_STORE_KEY } from './constants';
import GateWaysStore from './GateWaysStore';
import styles from './GatewaysPage.module.scss';

export default observer(() => {
  const store = useStore();

  const gateways = store.get(GATEWAYS_STORE_KEY);
  const loading = !gateways || gateways.loading;

  useEffect(() => {
    if (!store.has(GATEWAYS_STORE_KEY)) {
      store.set(
        GATEWAYS_STORE_KEY,
        new GateWaysStore(store.get(ERROR_PROCESSOR_KEY))
      );
    }

    store.get(GATEWAYS_STORE_KEY).fetchData();
  }, []);

  return (
    <div className={clsx(styles.root, { [styles.loading]: loading })}>
      {loading ? <Loader /> : <>Gateways</>}
    </div>
  );
});
