import { useQuery } from 'react-query';
import { LCDClient } from '@terra-money/terra.js';

const useDenomTrace = (denom = '', lcd: LCDClient) => {
  const hash = denom.replace('ibc/', '');
  return useQuery(
    ['denomTrace', hash],
    async () => {
      const denom_trace = await lcd.ibcTransfer.denomTrace(hash);
      return denom_trace;
    },
    { enabled: denom.startsWith('ibc') },
  );
};

export default useDenomTrace;
