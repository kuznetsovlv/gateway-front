import React, { useState } from 'react';

import { putGateway } from 'api';
import { Page, Input, IPInput } from 'components';

const CreateGateway = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [ip, setIp] = useState(null);

  return (
    <Page title="Create New Gateway" loading={loading}>
      <Input
        label="Name"
        value={name}
        placeholder="Gateway's name"
        required
        onChange={setName}
      />
      <IPInput
        label="IP"
        value={ip}
        placeholder="Gateway's ip"
        required
        onChange={setIp}
      />
    </Page>
  );
};

export default CreateGateway;
