import React, { useState } from 'react';

import { putGateway } from 'api';
import { Page, Input } from 'components';

const CreateGateway = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  return (
    <Page title="Create New Gateway" loading={loading}>
      <Input
        label="name"
        value={name}
        placeholder="Gateway's name"
        required
        onChange={setName}
      />
    </Page>
  );
};

export default CreateGateway;
