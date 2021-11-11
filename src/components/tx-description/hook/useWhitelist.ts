import axios from 'axios';
import { useQuery } from 'react-query';
import { TERRA_ASSETS } from '../helpers/constants';
import { useNetwork } from '../helpers/NetworkProvider';
import { TokenInfo } from '../helpers/types';

type NetworkName = string;
type Address = string;
type Data = Record<NetworkName, Record<Address, TokenInfo>>;

const useWhitelist = () => {
  const { name } = useNetwork();
  const config = { baseURL: TERRA_ASSETS };
  return useQuery('Whitelist', async () => {
    const { data } = await axios.get<Data>('cw20/tokens.json', config);
    return data[name];
  });
};

export default useWhitelist;
