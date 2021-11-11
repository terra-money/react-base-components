import { useQuery } from 'react-query';
import { LCDClient } from '@terra-money/terra.js';
import { DenomTrace } from '@terra-money/terra.js/dist/core/ibc-transfer/DenomTrace';

/* TODO: Remove force typing on terra.js fixed */

const useDenomTrace = (denom = '', lcd: LCDClient) => {
  const hash = denom.replace('ibc/', '');
  return useQuery(
    ['denomTrace', hash],
    async () => {
      const { denom_trace: dt } = (await lcd.ibcTransfer.denomTrace(
        hash,
      )) as unknown as {
        denom_trace: DenomTrace;
      };
      return dt;
    },
    { enabled: denom.startsWith('ibc') },
  );
};

export default useDenomTrace;
