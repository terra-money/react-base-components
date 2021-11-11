import React from 'react';
import { AccAddress } from '@terra-money/terra.js';
import { isDenomTerraNative, readAmount, readDenom } from 'terra-utils';
import { formatDenom, splitTokenText } from './helpers/utility';
import { DEFAULT_DECIMALS } from './helpers/constants';
import useTokenContractQuery from './helpers/useTokenContractQuery';
import useDenomTrace from './hook/useDenomTrace';
import TokenAddress from './TokenAddress';
import FinderLink from './FinderLink';
import { useLCDClient } from './helpers/NetworkProvider';

const Coin = ({ children: coin }: { children: string }) => {
  const { amount, token } = splitTokenText(coin);
  const { data: tokenInfo } = useTokenContractQuery(token);
  const lcd = useLCDClient();
  const { data } = useDenomTrace(coin.replace(amount, ''), lcd);

  let unit;

  if (AccAddress.validate(token)) {
    unit = (
      <FinderLink address={token}>
        <TokenAddress>{token}</TokenAddress>
      </FinderLink>
    );
  } else if (isDenomTerraNative(token)) {
    unit = <>{readDenom(token)}</>;
  } else if (data) {
    unit = <>{formatDenom(data.base_denom)}</>;
  } else {
    unit = <>{token}</>;
  }

  const decimals = tokenInfo?.decimals || DEFAULT_DECIMALS;

  return (
    <strong>
      {readAmount(amount, { decimals, comma: true })} {unit}
    </strong>
  );
};

export default Coin;
