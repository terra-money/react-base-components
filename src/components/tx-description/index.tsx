import React, { Fragment } from 'react';
import { AccAddress, ValAddress } from '@terra-money/terra.js';
import { ComponentProps } from './helpers/types';
import { isCoins } from './helpers/utility';
import { PropsProvider } from './helpers/NetworkProvider';
import ValidatorAddress from './ValidatorAddress';
import TerraAddress from './TerraAddress';
import Coins from './Coins';
import Word from './Word';

interface Props extends ComponentProps {
  children: string;
}

const TxDescription = ({ children: sentence, network, config }: Props) => {
  const renderWord = (word: string, index: number) => {
    let render;
    if (ValAddress.validate(word)) {
      render = <ValidatorAddress>{word}</ValidatorAddress>;
    } else if (AccAddress.validate(word)) {
      render = <TerraAddress>{word}</TerraAddress>;
    } else if (isCoins(word)) {
      render = <Coins>{word}</Coins>;
    } else {
      render = <Word bold={!index}>{word}</Word>;
    }
    return render;
  };

  return (
    <PropsProvider value={{ network, config }}>
      {sentence.split(' ').map((word, i) => (
        <Fragment key={`fg-${i.toString()}`}>
          {!!i && ' '}
          {renderWord(word, i)}
        </Fragment>
      ))}
    </PropsProvider>
  );
};

export { TxDescription };
