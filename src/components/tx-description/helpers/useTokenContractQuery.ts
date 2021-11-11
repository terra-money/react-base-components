import { useQuery } from 'react-query';
import { AccAddress } from '@terra-money/terra.js';
import { useLCDClient } from './NetworkProvider';
import useWhitelist from '../hook/useWhitelist';
import { TokenInfo } from './types';

const useTokenContractQuery = (address: string) => {
  const lcd = useLCDClient();
  const { data: whitelist, isLoading: isWhitelistLoading } = useWhitelist();

  return useQuery(
    ['token', address],
    async () => {
      if (whitelist?.[address]) {
        return whitelist[address];
      }
      const tokenInfo = await lcd.wasm.contractQuery<TokenInfo>(address, {
        token_info: {},
      });

      return tokenInfo;
    },
    {
      enabled: !isWhitelistLoading && AccAddress.validate(address),
    },
  );
};

export default useTokenContractQuery;
