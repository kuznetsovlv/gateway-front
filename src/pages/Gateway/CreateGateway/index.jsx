import React, { useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { putGateway } from 'api';
import { Page, Input, IPInput, Button } from 'components';
import styles from './CreateGateway.module.scss';

const CreateGateway = memo(() => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
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
      <Button
        className={styles.submit}
        type="submit"
        disabled={ip === null || !name}
        onClick={() => {
          setName(true);
          putGateway({ name, ip }).then(
            serial => {
              setLoading(false);
              setSearchParams({ serial });
            },
            () => setLoading(false)
          );
        }}
      >
        Create
      </Button>
    </Page>
  );
});

export default CreateGateway;
