import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { getGatewayList } from 'api';
// import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';

export default observer(() => {
  useEffect(() => {
    getGatewayList().then(console.log);
  }, []);

  return <>Gateways</>;
});
