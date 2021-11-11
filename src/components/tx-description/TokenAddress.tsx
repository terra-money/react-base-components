import React from 'react';
import { truncate } from 'terra-utils';
import useTokenContractQuery from './helpers/useTokenContractQuery';
import useContracts from './hook/useContracts';

const TokenAddress = ({ children: address }: { children: string }) => {
  const { data: contracts } = useContracts();
  const { data: tokenInfo } = useTokenContractQuery(address);
  const token = contracts?.[address]?.name || tokenInfo?.symbol;

  return <>{token ?? truncate(address)}</>;
};

export default TokenAddress;
