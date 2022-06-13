import axios from 'axios';
import { useQuery } from 'react-query';
import { TERRA_ASSETS } from '../helpers/constants';
import { useNetwork } from '../helpers/NetworkProvider';
import { IBCTokenInfo } from '../helpers/types';

type NetworkName = string;
type Address = string;
type Data = Record<NetworkName, Record<Address, IBCTokenInfo>>;

/* hook */
export const useIBCWhitelist = () => {
  const { name } = useNetwork();
  const config = { baseURL: TERRA_ASSETS };
  return useQuery('IBCWhitelist', async () => {
    const { data } = await axios.get<Data>('ibc/tokens.json', config);
    return data[name];
  });
};
