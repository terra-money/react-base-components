import React from 'react';
import { useProps } from './helpers/NetworkProvider';
import TokenAddress from './TokenAddress';
import FinderLink from './FinderLink';
import useContracts from './hook/useContracts';

const TerraAddress = ({ children: address }: { children: string }) => {
  const { config } = useProps();
  const isMyWallet = address === config?.myWallet;

  const { data: contracts } = useContracts();

  const getContractName = (contractAddress: string) => {
    const contract = contracts?.[contractAddress];
    if (!contract) {
      return undefined;
    }
    const { protocol, name: contractName } = contract;

    return [protocol, contractName].join(' ');
  };

  return (
    <FinderLink address={address}>
      {isMyWallet
        ? 'My wallet'
        : getContractName(address) ?? <TokenAddress>{address}</TokenAddress>}
    </FinderLink>
  );
};

export default TerraAddress;
