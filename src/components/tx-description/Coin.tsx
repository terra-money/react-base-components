import React from 'react';
import { AccAddress } from '@terra-money/terra.js';
import { isDenomTerraNative, readAmount, readDenom } from 'terra-utils';
import { formatDenom, splitTokenText } from './helpers/utility';
import { DEFAULT_DECIMALS } from './helpers/constants';
import useTokenContractQuery from './helpers/useTokenContractQuery';
import useDenomTrace from './hook/useDenomTrace';
import useIsClassic from './hook/useIsClassic';
import TokenAddress from './TokenAddress';
import FinderLink from './FinderLink';
import { useLCDClient } from './helpers/NetworkProvider';

const Coin = ({ children: coin }: { children: string }) => {
  const isClassic = useIsClassic();
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
    const denom = readDenom(token);
    const classicDenom = denom === 'Luna' ? 'Lunc' : `${denom}C`;
    unit = <>{isClassic ? classicDenom : denom}</>;
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
