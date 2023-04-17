import React, { useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { putGateway } from 'api';
import { Page, Gateway } from 'components';

const CreateGateway = memo(() => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [ip, setIp] = useState(null);

  return (
    <Page title="Create New Gateway" loading={loading}>
      <Gateway
        name={name}
        ip={ip}
        saveDisabled={ip === null || !name}
        onNameChange={setName}
        onIPChange={setIp}
        onSave={() => {
          setLoading(true);
          putGateway({ name, ip }).then(
            serial => {
              setLoading(false);
              setSearchParams({ serial });
            },
            () => setLoading(false)
          );
        }}
      />
    </Page>
  );
});

export default CreateGateway;
