import React, { Fragment } from 'react';
import { useProps } from './helpers/NetworkProvider';
import Coin from './Coin';

const Coins = ({ children }: { children: string }) => {
  const { config } = useProps();
  const printCoins = config?.printCoins || Infinity;

  if (children.endsWith(','))
    return (
      <>
        <Coin>{children.slice(0, -1)}</Coin>,
      </>
    );

  const coins = children.split(',');

  return (
    <>
      {coins.length > printCoins ? (
        <strong>multiple coins</strong>
      ) : (
        coins.map((coin, i) => (
          <Fragment key={`fg-${i.toString()}`}>
            {!!i && ', '}
            <Coin>{coin}</Coin>
          </Fragment>
        ))
      )}
    </>
  );
};

export default Coins;
