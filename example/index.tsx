import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TxDescription } from '..';

const App = () => {
  const CONFIG = {
    name: 'testnet',
    URL: 'https://bombay-lcd.terra.dev',
    chainID: 'bombay-12',
  };

  return (
    <TxDescription network={CONFIG}>
      Send 1234567uluna to terra1fs6c6y65c65kkjanjwvmnrfvnm2s58ph88t9ky
    </TxDescription>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
