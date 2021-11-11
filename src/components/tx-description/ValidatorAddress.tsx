import React from 'react';
import { useQuery } from 'react-query';
import { truncate } from 'terra-utils';
import { useLCDClient } from './helpers/NetworkProvider';
import FinderLink from './FinderLink';

const ValidatorAddress = ({ children: address }: { children: string }) => {
  const render = (moniker?: string) => (
    <FinderLink address={address} validator>
      {moniker ?? truncate(address)}
    </FinderLink>
  );

  const lcd = useLCDClient();
  const { data } = useQuery('validators', () => lcd.staking.validators());

  if (!data) {
    return render();
  }

  const [validators] = data;
  const moniker = validators.find(
    (validator) => validator.operator_address === address,
  )?.description.moniker;

  return render(moniker);
};

export default ValidatorAddress;
